const Helper = require('./Helper');
const iconvLite = require('iconv-lite');

/**消息解析相关 */
class MessageHelper {

    // #siyou = '私有属性';
    
    constructor(message) {
        if (new.target !== undefined) {
            this.msg = MessageHelper.getMsg(message);
            this.msgArray = this.msg.split(' ');
            this.header = MessageHelper.getHeader(this.msgArray);
            this.body = this.header.bodyArray;
            this.getThis = () => this;
        } else {
            throw new Error('必须使用 new 命令生成实例');
        }
    }

    /**
     * 去除了标识位和校验码后的消息，并进行转义处理
     * @param message 原始消息
     */
    static getMsg(message) {
        let result = message.toLowerCase();
        while (result.indexOf("  ") >= 0) {
            result = result.replace("  ", " ").trim()
        }
        if (result.indexOf("7e") != 0) {
            return result;
        }
        // console.log('开始'+result);
        //去标识位
        let length = result.length;
        result = result.substring(2, (length - 2)).trim();
        // console.log('去标识'+result);
        //去校验码
        length = result.length;
        result = result.substring(0, (length - 2)).trim();
        // console.log('去校验码'+result);
        if (message.indexOf('7e') === 0) {
            //转义处理
            result = result.replace("7d 02", "7e").trim();
            result = result.replace("7d 01", "7d").trim();
            // console.log('转义后'+result);
        }
        return result;
    }
    
    /**
     * 获取消息头
     * @param message 去除了标识位和校验码后的消息数组
     */
    static getHeader(msgArray) {
        var id = msgArray[0] + msgArray[1];//消息ID 
        var bodyAttribute = Helper.changeByteString(msgArray[2] + msgArray[3],16,2)//消息体属性(16位的2进制字符数据)
        var imei = msgArray.length > 10 ? `${msgArray[4][1]}` + msgArray.slice(5,10).join('') : null; //终端手机号
        var num = parseInt(msgArray[10] + msgArray[11],16);//消息流水号 
        var rsa = bodyAttribute.charAt(15-10) === '1'//消息体是否经过 RSA 算法加密
        var packageTotal = null;//消息总包数 
        var packageNum = null;//包序号
        var headerArray = null;//消息头数据组
        //当消息体属性中第 13 位为 1 时表示消息体为长消息，进行分包发送处理，具体分包信息由消息包封装项决定；若第 13 位为 0，则消息头中无消息包封装项字段。
        if (bodyAttribute.charAt(15-13) === '1') {
            packageTotal = parseInt((msgArray[12] + msgArray[13]),16);
            packageNum = parseInt((msgArray[14] + msgArray[15]),16);
            headerArray = msgArray.slice(0,16).join(' ');
        } else {
            headerArray = msgArray.slice(0,12);
        }
        var bodyLength = parseInt(bodyAttribute.substring(15-9,16),2);
        var bodyArray = msgArray.slice(headerArray.length);//消息体数据组
        return {
            /**消息ID*/ 
            ID: id,
            /**消息体属性(16位的2进制字符数据)*/ 
            bodyAttribute: bodyAttribute,
            /**终端手机号*/ 
            IMEI: imei,
            /**消息流水号*/ 
            messageNum: num,
            /**消息体是否经过 RSA 算法加密 */
            RSA: rsa,
            /**消息总包数*/ 
            packageTotal: packageTotal,
            /**包序号*/ 
            packageNum: packageNum,
            /**消息头数据组 */
            headerArray: headerArray,
            /**消息体数据组*/ 
            bodyArray: bodyArray,
        };
    }

    /**
     * 获取消息体
     */
    getBody() {
        var body = this.header.bodyArray;
        if (!(body && body.length > 0)) {return;}
        if (this.header.ID == '0200'){
            return this._getBody_0200(body);
        }else if (this.header.ID == '0100') {
            return this._getBody_0100(body);
        }else if (this.header.ID == '0107') {
            return this._getBody_0107(body);
        }else if (this.header.ID == '0704') {
            return this._getBody_0704(body);
        }else if (this.header.ID == '0102') {
            return this._getBody_0102(body)
        }
    }

    /**
     * 获取消息体信息0200-位置信息汇报
     * @param bodyArray 消息体数据组
     */
    _getBody_0200(bodyArray = this.body) {
        var warning =  Helper.changeByteString(bodyArray.slice(0,4).join(""),16,2,32);
        var state = Helper.changeByteString(bodyArray.slice(4,8).join(""),16,2,32);
        var latitudeBinary = Helper.changeByteString(bodyArray.slice(8,12).join(""),16,2,32);
        var latitude = parseInt(latitudeBinary,2)/1000000;
        var longitudeBinary = Helper.changeByteString(bodyArray.slice(12,16).join(""),16,2,32);
        var longitude = parseInt(longitudeBinary,2)/1000000;
        var elevationBinary = Helper.changeByteString(bodyArray.slice(16,18).join(""),16,2,16);
        var elevation = parseInt(elevationBinary,2);
        var speedBinary = Helper.changeByteString(bodyArray.slice(18,20).join(""),16,2,16);
        var speed = parseInt(speedBinary,2)/10;
        var directionBinary = Helper.changeByteString(bodyArray.slice(20,22).join(""),16,2,16);
        var direction = parseInt(directionBinary,2);
        let year = bodyArray.slice(22,25).join('/');
        let time = bodyArray.slice(25,28).join(':');
        var datetime = `20${year} ${time}`
        var extraID = parseInt(bodyArray.slice(28,29),16);
        var extraLength = parseInt(bodyArray.slice(29,30),16);
        var extraInfo = bodyArray.slice(30,30+extraLength);
        var alert = this.getAllWarning(warning);//获取所有报警信息
        var point = {
            longitude: longitude,
            latitude: latitude,
            direction: direction,
            altitude: elevation,
            datetime: datetime,
            speed: speed,
            alert: alert,
        };
        return {
            /**消息体数据组*/ 
            bodyArray: bodyArray,
            warning: warning,
            state : state,
            /**纬度 */
            latitude: latitude,
            /**经度 */
            longitude: longitude,
            /**海拔高度，单位为米（m） */
            elevation: elevation,
            /**速度  km/h */
            speed: speed,
            /**方向 0-359，正北为0，顺时针*/
            direction: direction,
            /**时间 YY-MM-DD hh:mm:ss（GMT+8时间，本标准中之后涉及的时间均采用此时区）*/
            datetime: datetime,
            /**附加信息ID */
            extraID: extraID,
            /**附加信息长度 */
            extraLength: extraLength,
            /**附加信息 */
            extraInfo: extraInfo,
            /**转化为device结构的数据（后期待完善） */
            device: {
                imei: this.header.IMEI,
                last_gps_point: point
            },
        };
    }

    /**
     * 获取所有的警告信息 
     * @param {*} binary 报警标识的二进制字符串
     */
    getAllWarning(binary) {
        var result = new Array();
        for (let index = 0; index < binary.length; index++) {
            let warningMark = this.getWarningMark(binary,index);
            if (warningMark) {
                result.push(warningMark);
            }
        }
        return result;
    }

    /**
     * 判断报警标志对应位置的报警信息，无则返回null
     * @param {*} binary 报警标识的二进制字符串
     * @param {*} index 位置
     */
    getWarningMark(binary, index) {        
        if (Helper.isEqualTo(binary,index,'1')) {
            switch (index) {
                case 0:
                    return '紧急报警，触动报警开关后触发';
                case 1:
                    return '设备超速报警';
                case 2:
                    return '疲劳驾驶';
                case 3:
                    return '危险预警';
                case 4:
                    return 'GNSS模块发生故障';
                case 5:
                    return 'GNSS天线未接或被剪断';
                case 6:
                    return 'GNSS天线短路';
                case 7:
                    return '终端主电源欠压';
                case 8:
                    return '终端主电源掉电';
                case 9:
                    return '终端LCD或显示器故障';
                case 10:
                    return 'TTS模块故障';
                case 11:
                    return '摄像头故障';
                case 12:
                    return '道路运输证IC卡模块故障';
                case 13:
                    return '超速预警';
                case 14:
                    return '疲劳驾驶预警';
                case 18:
                    return '当天累计驾驶超时';
                case 19:
                    return '超时停';
                case 20:
                    return '进出区域';
                case 21:
                    return '进出路线';
                case 22:
                    return '路段行驶时间不足/过长';
                case 23:
                    return '路线偏离报警';
                case 24:
                    return '车辆VSS故障';
                case 25:
                    return '车辆油量异常';
                case 26:
                    return '车辆被盗(通过车辆防盗器)';
                case 27:
                    return '车辆非法点火';
                case 28:
                    return '车辆非法位移';
                case 29:
                    return '碰撞预警';
                case 30:
                    return '侧翻预警';
                case 31:
                    return '非法开门报警(终端未设置区域时，不判断非法开门)';
                default:
                    break;
            }
        }
        return null;
    }

    /**
     * 判断状态位对应位置的状态
     * @param {*} binary 状态位的二进制字符串
     * @param {*} index 位置
     */
    getStateMark(binary, index) {
        switch (index) {
            case 0:
                return (Helper.isEqualTo(binary,index,'0')) ? 'ACC关' : 'ACC开';
            case 1:
                return (Helper.isEqualTo(binary,index,'0')) ? '未定位' : '定位';
            case 2:
                return (Helper.isEqualTo(binary,index,'0')) ? '北纬' : '南纬';
            case 3:
                return (Helper.isEqualTo(binary,index,'0')) ? '东经' : '西经';
            case 4:
                return (Helper.isEqualTo(binary,index,'0')) ? '运营状态' : '停运状态 ';
            case 5:
                return (Helper.isEqualTo(binary,index,'0')) ? '经纬度未经保密插件加密' : '经纬度已经保密插件加密 ';
            case 6,7:
                return null;
            case 8:
                if (Helper.isEqualTo(binary,8,'00')) {
                    return '空车';
                }else if (Helper.isEqualTo(binary,8,'01')) {
                    return '半载';
                }else if (Helper.isEqualTo(binary,8,'10')) {
                    return '保留';
                }else if (Helper.isEqualTo(binary,8,'11')) {
                    return '满载';
                }
            case 10:
                return (Helper.isEqualTo(binary,index,'0')) ? '车辆油路正常' : '车辆油路断开';
            case 11:
                return (Helper.isEqualTo(binary,index,'0')) ? '车辆电路正常' : '车辆电路断开';
            case 12:
                return (Helper.isEqualTo(binary,index,'0')) ? '车门解锁' : '车门加锁';
            case 13:
                return (Helper.isEqualTo(binary,index,'0')) ? '门1关' : '门1开(前门';
            case 14:
                return (Helper.isEqualTo(binary,index,'0')) ? '门2关' : '门2开(中门)';
            case 15:
                return (Helper.isEqualTo(binary,index,'0')) ? '门3关' : '门3开(后门)';
            case 16:
                return (Helper.isEqualTo(binary,index,'0')) ? '门4关' : '门4开(驾驶席门)';
            case 17:
                return (Helper.isEqualTo(binary,index,'0')) ? '门5关' : '门5开(自定义)';
            case 18:
                return (Helper.isEqualTo(binary,index,'0')) ? '未使用GPS卫星进行定位' : '使用GPS卫星进行定位';
            case 19:
                return (Helper.isEqualTo(binary,index,'0')) ? '未使用北斗卫星进行定位' : '使用北斗卫星进行定位';
            case 20:
                return (Helper.isEqualTo(binary,index,'0')) ? '未使用GLONASS卫星进行定位' : '使用GLONASS卫星进行定位';
            case 21:
                return (Helper.isEqualTo(binary,index,'0')) ? '未使用Galileo卫星进行定位' : '使用Galileo卫星进行定位';
            default:
                break;
        }
        return null
    }
    
    /**
     * 获取消息体信息0107-查询终端属性应答 
     * @param bodyArray 消息体数据组
     */
    _getBody_0107(bodyArray = this.body) {
        var typeBinary = Helper.changeByteString(bodyArray.slice(0,2).join(""),16,2,16);
        var manufacturerID = Helper.getStringFrom(bodyArray.slice(2,7),16).join('');
        var terminalType = Helper.getStringFrom(bodyArray.slice(7,27),16).join('');//bodyArray.slice(7,27).join('');
        var terminalID = Helper.getStringFrom(bodyArray.slice(27,34),16).join('');//bodyArray.slice(27,34).join('');
        var ICCID = bodyArray.slice(42,52).join('');
        var hardwareVersionLength = parseInt(bodyArray[52],16);
        var hardwareVersion = iconvLite.decode(Helper.getStringFrom(bodyArray.slice(53,53+hardwareVersionLength),16).join(''),'gbk');;
        var firmwareVersionLength = parseInt(bodyArray[53+hardwareVersionLength],16);;
        var firmwareVersion = iconvLite.decode(Helper.getStringFrom(bodyArray.slice(55+hardwareVersionLength,55+hardwareVersionLength+firmwareVersionLength),16).join(''),'gbk');;;
        return {
            /**
             * 终端类型 -bit0，0：不适用客运车辆，1：适用客运车辆； bit1，0：不适用危险品车辆，1：适用危险品车辆； bit2，0：不适用普通货运车辆，1：适用普通货运车辆； bit3，0：不适用出租车辆，1：适用出租车辆； bit6，0：不支持硬盘录像，1：支持硬盘录像； bit7，0：一体机，1：分体机
             */
            type: typeBinary,
            /**制造商ID - 5个字节，终端制造商编码。*/
            manufacturerID: manufacturerID,
            /**终端型号 - 20个字节，此终端型号由制造商自行定义，位数不足时，后补“0X00”*/
            terminalType: terminalType,
            /**终端ID - 7个字节，由大写字母和数字组成，此终端ID由制造商自行定义，位数不足时，后补“0X00” */
            terminalID: terminalID,
            /**终端SIM卡ICCID */
            ICCID: ICCID,
            /**终端硬件版本号长度 */
            hardwareVersionLength: hardwareVersionLength,
            /**终端硬件版本号 */
            hardwareVersion: hardwareVersion,
            /**终端固件版本号长度  */
            firmwareVersionLength: firmwareVersionLength,
            /**终端固件版本号 */
            firmwareVersion: firmwareVersion,
        }
    }

    /**
     * 获取消息体信息0100-终端注册
     * @param bodyArray 消息体数据组
     */
    _getBody_0100(bodyArray = this.body) {
        var bodyArray = this.body;
        if (!(bodyArray && bodyArray.length > 0)) {
            return;
        }
        var provincialID = Helper.changeByteString(bodyArray.slice(0,2).join(''),16,10,2);
        var countyID = Helper.changeByteString(bodyArray.slice(2,4).join(''),16,10,4);
        var manufacturerID = Helper.getStringFrom(bodyArray.slice(4,9),16).join('');//bodyArray.slice(4,9).join('');
        var terminalType = Helper.getStringFrom(bodyArray.slice(9,29),16).join('');//bodyArray.slice(9,29).join('');
        var terminalID = Helper.getStringFrom(bodyArray.slice(29,36),16).join('');//bodyArray.slice(29,36).join('');
        var plateColor = parseInt(bodyArray.slice(36,37),16);
        var identification = iconvLite.decode(Helper.getStringFrom(bodyArray.slice(37,45),16).join(''),'gbk');
        return {
            /**省域ID - 标示终端安装车辆所在的省域，0保留，由平台取默认值。省域ID采用GB/T 2260中规定的行政区划代码六位中前两位 */
            provincialID: provincialID,
            /**市县域ID - 标示终端安装车辆所在的市域和县域，0保留，由平台取默认值。市县域ID采用GB/T 2260中规定的行政区划代码六位中后四位。 */
            countyID: countyID,
            /**制造商ID - 5个字节，终端制造商编码 */
            manufacturerID: manufacturerID,
            /**终端型号 - 20个字节，此终端型号由制造商自行定义，位数不足时，后补“0X00”*/
            terminalType: terminalType,
            /**终端ID - 7个字节，由大写字母和数字组成，此终端ID由制造商自行定义，位数不足时，后补“0X00”*/
            terminalID: terminalID,
            /**车牌颜色，按照JT/T415-2006的5.4.12。未上牌时，取值为0 */
            plateColor: plateColor,
            /**车辆标识 - 车牌颜色为0时，表示车辆VIN；否则，表示公安交通管理部门颁发的机动车号牌。 */
            identification: identification,
        }
    }

    /**
     * 获取消息体信息0704-定位数据批量上传
     * @param bodyArray 消息体数据组
     */
    _getBody_0704(bodyArray = this.body) {
        var num = parseInt(bodyArray.slice(0,2).join(''),16);
        var type = parseInt(bodyArray[2],8);
        var infoBody = bodyArray.slice(3);
        var infoArray = new Array();
        var devices = new Array();
        var index = 0;
        while (index < infoBody.length) {
            let lentgh = parseInt(infoBody.slice(index,2+index).join(''),16);
            const element = infoBody.slice(2+index,2+index+lentgh);
            if (element.length < lentgh) {
                break;
            }
            let item = this._getBody_0200(element);
            infoArray.push(item);
            devices.push(item.device);
            index += (2 + lentgh);
        }
        return {
            /**数据项个数 */
            num: num,
            /**位置数据类型 0：正常位置批量汇报，1：盲区补报*/
            type: type,
            /**位置汇报数据体解析结果 */
            infoArray: infoArray,
            /**位置汇报数据体解析为device的集合 */
            devices: devices,
        }
    }

    /**
     * 获取消息体信息0102-终端鉴权
     * @param bodyArray 消息体数据组
     */
    _getBody_0102(bodyArray = this.body) {
        var authentication = iconvLite.decode(Helper.getStringFrom(bodyArray.slice(0),16).join(''),'gbk');
        return {
            /**鉴权码 终端重连后上报鉴权码 */
            authentication: authentication,
        }
    }

}

module.exports = MessageHelper;
