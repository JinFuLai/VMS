const mongoose = require('mongoose');
const device = require('../Model/device');
const location = require('../Model/location');
const vehicle = require('../Model/vehicle');
const manufactor = require('../Model/manufactor');
const consts = require('../Helper/consts');
const Helper = require('../Helper/Helper');
const request = require("request");

/**通用回复 */
class MsgGeneral {
    /**成功/确认 */
    static res_0() {return '0'}
    /**失败 */
    static res_1() {return '1'}
    /**消息有误 */
    static res_2() {return '2'}
    /**不支持 */
    static res_3() {return '3'}
    /**报警处理确认 */
    static res_4() {return '4'}
}

 // 抽离成公共方法
 const awaitWrap = (promise) => {
     return promise
        .then(data => [null, data])
        .catch(err => [err, null])
 }

/**创建车辆 */
async function creatVehicle(info) {
    var newVehicle = new vehicle(info);
    newVehicle.save()
        .then(item => {//添加成功
            return [null, item];
        })
        .catch(err => {//创建失败
            return [err,null];
        });
}
/**创建设备 */
async function creatDevice(info) {
    var newDevice = new device(info);
    newDevice.save()
        .then(item => {//添加成功
            return [null, item];
        })
        .catch(err => {//创建失败
            return [err,null];
        });
}

/**创建生产厂家 */
async function creatManufactor(info) {
    var newManufactor = new manufactor(info);
    newManufactor.save()
        .then(item => {//添加成功
            return [null, item];
        })
        .catch(err => {//创建失败
            return [err,null];
        });
}

/**获取地理编码 */
async function getLocationAddrerss(locatin) {
    const {latitude, longitude} = locatin;
    request({
        url: `http://jinfulaikeji.com:2001/api/app/geocoder?longitude=${longitude}&latitude=${latitude}`,
        method: "post",//如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {}
    }, function (error, response, body) {
        if (!error && response.statusCode == 200 && body && body.data) {
            return [null,body.data];
        }else{
            return [error ? error : 'error', null];
        }
    }); 
}

class NetWorkHelper {
    /**
     * 注册车辆设备信息（待处理）
     * @param {*} imei imei
     * @param {*} info 注册的消息体-0100
     * @param {*} callback 回调（'0'：成功；'1'：车辆已被注册；'2'：数据库中无该车辆；'3'：终端已被注册；'4'：数据库中无该终端）
     */
    static async registerDevice(imei,info,callback){
        const [err, vehicles] = await awaitWrap(vehicle.find({plate: info.identification}).populate('device'));//查找出车辆
        if (err) {
            console.log(err);
            callback('4');
            return;
        }
        const [err1, devices] = await awaitWrap(device.find({imei: imei}));//查找出设备
        if (err1) {
            console.log(err1);
            callback('4');
            return;
        }
        if (vehicles && vehicles[0] && vehicles[0].device && vehicles[0].device.imei == imei) {
            /**车辆存在设备,且设备一致时 */
            callback('0');
        } else {
            /**其他情况*/
            //先查看生产厂商
            const [manufactor_err, manufactors] = await awaitWrap(manufactor.find({code: info.manufacturerID}));//查找出生产厂商
            if (manufactor_err) {
                console.log(manufactor_err);
                callback('4');
                return;
            }
            /**生产厂商 */
            var theManufactors = manufactors ? manufactors[0] : null;
            if (theManufactors) {
                //更新厂商信息
                const [updateManufactorError, _] = await awaitWrap(theManufactors.updateOne({code: info.manufacturerID}));
                if (updateManufactorError) {//更新失败
                    callback('4');
                    return;
                }
            }else{
                //创建厂商
                const [_, newManufactor] = await awaitWrap(creatManufactor({code: info.manufacturerID}));
                if (newManufactor) {
                    theManufactors = newManufactor; 
                }else{
                    callback('4');
                    return;
                }
            }
            /**当前设备 */
            var theDevice = devices ? devices[0] : null;
            if (theDevice) {
                //更新设备信息
                const [updateDeviceError, _] = await awaitWrap(theDevice.updateOne({device_id: info.terminalID, international_code: info.terminalType, manufactor: theManufactors.id}));
                if (updateDeviceError) {//更新失败
                    callback('4');
                }
            }else{
                //设备不存在，就创建设备
                const [_, newDevice] = await awaitWrap(creatDevice({imei: imei, device_id: info.terminalID, international_code: info.terminalType, manufactor: theManufactors.id}));
                if (newDevices) {
                    theDevice = newDevice; 
                }else{
                    callback('4');
                    return;
                }
            }
            /**当前车辆 */
            var theVehicle = vehicles ? vehicles[0] : null;
            if (theVehicle) {
                //更新车辆信息
                const [updateVehicleError, _] = await awaitWrap(theVehicle.updateOne({device: theDevice.id}));
                if (updateVehicleError) {//更新失败
                    callback('1');
                }else{//更新成功
                    callback('0');
                }
            }else{
                //设备不存在，就创建车辆
                const [_, newVehicle] = await awaitWrap(creatVehicle({plate: info.identification,device: theDevice.id, plate_color: info.plateColor}));//创建车辆，并绑定设备
                if (newVehicle) {
                    callback('0');
                }else{
                    callback('2');
                }
            }
        }
    }

    /**
     * 更新车辆设备信息
     * @param {string} imei IMEI
     * @param {device} info 更新的信息 device
     * @param {MsgGeneral} callback 回调 
     */
    static async updatDeviceInfo(imei,info,callback){
        //先获取位置信息
        if (info.last_gps_point && info.last_gps_point.latitude && info.last_gps_point.longitude) {
            const [err, address] = await awaitWrap(getLocationAddrerss(info.last_gps_point));//查找出设备
            if (address) {
                info.last_gps_point.address = address;
            }
        }
        const [err, devices] = await awaitWrap(device.find({imei: imei}));
        if (err) {
            console.log(err);
            callback(MsgGeneral.res_1());
            return;
        }
        if (devices && devices.length === 1) {//存在设备才更新
            /**
             * 更新数据的方法
             * @param {*} ele 更新的对象
             * @param {*} deviceInfo 更新的信息
             * @param {*} update_Location 是否更新Location表中
             */
            async function update(ele,deviceInfo,update_Location=true) {
                ele.updateOne(deviceInfo,(err,doc) => {
                    if (err) {//更新失败
                        console.log('更新失败' + err);
                        callback(MsgGeneral.res_1());
                    }else if (doc) {//更新成功
                        console.log('更新成功'+doc);
                        callback(MsgGeneral.res_0());
                        if (update_Location) {
                            NetWorkHelper.updatDeviceHistory(imei,[info],function(err){});//更新历史轨迹
                        }
                    }
                });
            }                
            const element = devices[0];
            const ele_lastP = element.last_gps_point;
            const info_lastP = element.last_gps_point;
            if (ele_lastP) {
                const [err1, vehicles] = await awaitWrap(vehicle.find({device:element.id}));//查找出车辆
                if (vehicles && vehicles[0] && info_lastP) {//系统-超速设置
                    var maxspeed = vehicles[0].maxspeed;
                    if (maxspeed && maxspeed > 0 && info_lastP.speed && maxspeed < info_lastP.speed) {
                        if (info.last_gps_point.alert) {
                            info.last_gps_point.alert.push('系统超速');
                        } else {
                            info.last_gps_point.alert = ['系统超速'];
                        }
                    }
                }
                const ele_lastP_time = info_lastP.datetime;
                const info_lastP_time = info_lastP ? info_lastP.datetime : null;
                if (ele_lastP_time && info_lastP_time && Helper.withinTheSpecifiedTime(Date().toString(),info_lastP_time)) {//时间筛选

                    const distance = Helper.getDistance(ele_lastP.longitude,ele_lastP.latitude,info_lastP.longitude,info_lastP.latitude);
                    if (distance < consts.LIMIT_CONDITIONS.DISTANCE_SMALLEST) {
                        //距离了过小不存储
                    } else if (distance >= consts.LIMIT_CONDITIONS.DISTANCE_SMALLEST && distance < consts.LIMIT_CONDITIONS.DISTANCE_MIDDLE) {
                        //只更新device表
                        update(element,info,false);
                        return;
                    } else {
                        update(element,info);
                        return;
                    }
                } 
            }else{
                update(element,info);
                return;
            }
        }else{//不存在则创建设备
            // callback(MsgGeneral.res_0());//不操作，直接返回正确
            // return;
            const [creactDeviceError, newDevice] = await awaitWrap(creatDevice(info));
            if (creactDeviceError) {
                console.log('添加失败' + creactDeviceError);
                callback(MsgGeneral.res_1());
            }
            if (newDevice) {
                console.log('添加成功');
                callback(MsgGeneral.res_0());
                NetWorkHelper.updatDeviceHistory(imei,[info],function(err){});//更新历史轨迹
            }else{
                callback(MsgGeneral.res_1());
            }
        }
    }

    /**
     * 更新设备历史轨迹信息
     * @param {string} imei IMEI
     * @param {[location]} histroy 更新的位置信息数组 [location]
     * @param {MsgGeneral} callback 回调 
     */
    static async updatDeviceHistory(imei,histroy = [1],callback){
        // histroy.sort((a,b) =>{//按时间顺序重新排列
        //     if (a.last_gps_point.datetime > b.last_gps_point.datetime) {
        //         return 1;
        //     }else{
        //         return -1;
        //     }
        // });
        
        ///根据经纬度获取位置信息
        for (let index = 0; index < histroy.length; index++) {
            const element = histroy[index];
            if (element.gps_point && element.gps_point.latitude && element.gps_point.longitude) {
                const [err, address] = await awaitWrap(getLocationAddrerss(element.gps_point));//查找出设备
                if (address) {
                    element.gps_point.address = address;
                }
            }
        }
        const [err, deviceRes] = await awaitWrap(device.find({imei: imei}));//查找出设备
        if (err) {
            console.log(err);
            callback(MsgGeneral.res_1());
            return;
        }
        var resultDev = null;
        if (deviceRes.length <= 0) {//不存在设备时
            // callback(MsgGeneral.res_0());///不操作，直接返回正确
            // return;
            //创建设备
            var newDevice = new device({imei: imei});
            let result = await newDevice.save();
            if (result.length <= 0) {
                //创建失败
                callback(MsgGeneral.res_1());
                return;
            }else{
                resultDev = result;
            }
        }else{
            resultDev = deviceRes[0];
        }
        const [err1, vehicles] = await awaitWrap(vehicle.find({device:resultDev.id}));//查找出车辆
        var resultV = null;
        if (vehicles.length <= 0) {//不存在车辆时
            callback(MsgGeneral.res_1());//不操作，直接返回正确
            return;
        }else{
            resultV = vehicles[0];
        }
        //TO DO: driver、group后期再处理

        //生成location数组
        var info = new Array();
        for (let index = 0; index < histroy.length; index++) {
            const element = histroy[index];
            info.push({
                gps_point: element.last_gps_point,
                device: resultDev,
                vehicle: resultV
            });
        }
        //批量导入
        location.insertMany(info,(err,doc) => {
            if (err) {
                console.log('添加失败' + err);
                callback(MsgGeneral.res_1());
            }else{
                console.log(doc);
                callback(MsgGeneral.res_1());
            }
        });
    }

    /**
     * 更新0107消息的相关车辆设备信息
     * @param {string} imei IMEI
     * @param {device} info 0107消息得到的信息
     * @param {MsgGeneral} callback 回调 
     */
    static async update_0107_msg(imei,info,callback){
        const [err1, devices] = await awaitWrap(device.find({imei: imei}));//查找出设备
        if (err1) {
            console.log(err1);
            callback(MsgGeneral.res_1());
            return;
        }
        const [err2, manufactors] = await awaitWrap(manufactor.find({code: info.manufacturerID}));//查找出生产厂商
        if (err2) {
            console.log(err2);
            callback(MsgGeneral.res_1());
            return;
        }
        /**当前设备 */
        var theDevice = devices ? devices[0] : null;
        if (theDevice) {
            /**生产厂商 */
            var theManufactors = manufactors ? manufactors[0] : null;
            if (theManufactors) {
                //更新厂商信息
                const [updateManufactorError, _] = await awaitWrap(theManufactors.updateOne({code: info.manufacturerID}));
                if (updateManufactorError) {//更新失败
                    callback(MsgGeneral.res_1());
                    return;
                }
            }else{
                //创建厂商
                const [_, newManufactor] = await awaitWrap(creatManufactor({code: info.manufacturerID}));
                if (newManufactor) {
                    theManufactors = newManufactor; 
                }else{
                    callback(MsgGeneral.res_1());
                    return;
                }
            }
            //更新设备信息
            const [updateDeviceError, _] = await awaitWrap(theDevice.updateOne({device_id: info.terminalID, international_code: info.terminalType, manufactor: theManufactors.id}));
            if (updateDeviceError) {//更新失败
                callback(MsgGeneral.res_1());
            }else{
                callback(MsgGeneral.res_0());
            }
        }else{
            callback(MsgGeneral.res_1());
        }
    }
}

module.exports = NetWorkHelper;