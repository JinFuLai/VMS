const mongoose = require('mongoose');
const device = require('../Model/device');
const location = require('../Model/location');
const vehicle = require('../Model/vehicle');
const consts = require('../Helper/consts');
const Helper = require('../Helper/Helper');

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

class NetWorkHelper {

    /**
     * 注册车辆设备信息（待处理）
     * @param {string} imei IMEI
     * @param {*} plate 机动车牌号
     * @param {*} callback 回调（'0'：成功；'1'：车辆已被注册；'2'：数据库中无该车辆；'3'：终端已被注册；'4'：数据库中无该终端）
     */
    static async registerDevice(imei,plate,callback){
        let currentV = await vehicle.find({plate: plate}).populate('device');
        if (currentV.length > 0) {//车辆不存在
            callback('2');
        }else {
            if (currentV[0].device.imei == imei) {
                callback('0');
            }else{
                //TO DO:车辆的设备和传入的设备不一致
                callback('0');
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
        device.find({imei: imei},(err,docs) => {
            if (err) {
                console.log(err);
                callback(MsgGeneral.res_1());
                return;
            };
            if (docs && docs.length === 1) {//存在设备才更新
                /**
                 * 更新数据的方法
                 * @param {*} ele 更新的对象
                 * @param {*} deviceInfo 更新的信息
                 * @param {*} update_Location 是否更新Location表中
                 */
                function update(ele,deviceInfo,update_Location=true) {
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
                const element = docs[0];
                const ele_lastP = element.last_gps_point;
                const info_lastP = element.last_gps_point;
                if (ele_lastP) {
                    const ele_lastP_time = info_lastP.datetime;
                    const info_lastP_time = info_lastP ? info_lastP.datetime : null;
                    if (ele_lastP_time && info_lastP_time && Helper.withinTheSpecifiedTime(ele_lastP_time,info_lastP_time)) {//时间筛选

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
                var newDevice = new device(info);
                newDevice.save()
                    .then(item => {//添加成功
                        console.log('添加成功');
                        callback(MsgGeneral.res_0());
                        NetWorkHelper.updatDeviceHistory(imei,[info],function(err){});//更新历史轨迹
                    })
                    .catch(err => {//添加成功
                        console.log('添加失败' + err);
                        callback(MsgGeneral.res_1());
                    });
            }
        });
    }

    /**
     * 更新设备历史轨迹信息
     * @param {string} imei IMEI
     * @param {[location]} histroy 更新的位置信息数组 [location]
     * @param {MsgGeneral} callback 回调 
     */
    static async updatDeviceHistory(imei,histroy = [],callback){
        // histroy.sort((a,b) =>{//按时间顺序重新排列
        //     if (a.last_gps_point.datetime > b.last_gps_point.datetime) {
        //         return 1;
        //     }else{
        //         return -1;
        //     }
        // });
        var deviceRes = await device.find({imei: imei});//查找出设备
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
        var vehicles = await vehicle.find({device:resultDev.id});//查找出车辆
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

}

module.exports = NetWorkHelper;