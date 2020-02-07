const HashTable = require('./HashTable');
const Helper = require('./Helper/Helper');
const BBSocket = require('./BBSocket');
const MsgHelper = require('./Helper/MessageHelper');
const MsgResHelper = require('./Helper/MsgResponseHelper')
const NetWorkHelper = require('./Helper/NetWorkHelper');

class BBPlugin {
    constructor(){
        // this.allCommands = this.setCommands();
        this.allListeners = new Array();
    }

    // setCommands() {
    //     var allCommands = new HashTable();
    //     allCommands.Add("0001", "DWORD "); //终端心跳发送间隔，单位为秒（s） 
    //     allCommands.Add("0002", "DWORD "); //TCP 消息应答超时时间，单位为秒（s） 
    //     allCommands.Add("0003", "DWORD "); //TCP 消息重传次数 
    //     allCommands.Add("0004", "DWORD "); //UDP 消息应答超时时间，单位为秒（s）  
    //     allCommands.Add("0005", "DWORD "); //UDP 消息重传次数 
    //     allCommands.Add("0006", "DWORD "); //SMS 消息应答超时时间，单位为秒（s） 
    //     allCommands.Add("0007", "DWORD "); //SMS 消息重传次数 
    //     allCommands.Add("0010", "STRING"); //主服务器 APN，无线通信拨号访问点。若网络制式为 CDMA，则该处为PPP 拨号号码 
    //     allCommands.Add("0011", "STRING"); //主服务器无线通信拨号用户名 
    //     allCommands.Add("0012", "STRING"); //主服务器无线通信拨号密码 
    //     allCommands.Add("0013", "STRING"); //主服务器地址,IP 或域名 
    //     allCommands.Add("0014", "STRING"); //备份服务器 APN，无线通信拨号访问点 
    //     allCommands.Add("0015", "STRING"); //备份服务器无线通信拨号用户名 
    //     allCommands.Add("0016", "STRING"); //备份服务器无线通信拨号密码 
    //     allCommands.Add("0017", "STRING"); //备份服务器地址,IP 或域名 
    //     allCommands.Add("0018", "DWORD "); //服务器 TCP 端口 
    //     allCommands.Add("0019", "DWORD "); //服务器 UDP 端口 
    //     allCommands.Add("001A", "STRING"); //道路运输证 IC 卡认证主服务器 IP 地址或域名 
    //     allCommands.Add("001B", "DWORD "); //道路运输证 IC 卡认证主服务器 TCP 端口 
    //     allCommands.Add("001C", "DWORD "); //道路运输证 IC 卡认证主服务器 UDP 端口 
    //     allCommands.Add("001D", "STRING"); //道路运输证 IC 卡认证备份服务器 IP 地址或域名，端口同主服务器 
    //     allCommands.Add("0020", "DWORD "); //位置汇报策略，0：定时汇报；1：定距汇报；2：定时和定距汇报 
    //     allCommands.Add("0021", "DWORD "); //位置汇报方案，0：根据 ACC 状态； 1：根据登录状态和 ACC 状态，先判断登录状态，若登录再根据 ACC 状态  
    //     allCommands.Add("0022", "DWORD "); //驾驶员未登录汇报时间间隔，单位为秒（s），>0 
    //     allCommands.Add("0027", "DWORD "); //休眠时汇报时间间隔，单位为秒（s），>0 
    //     allCommands.Add("0028", "DWORD "); //紧急报警时汇报时间间隔，单位为秒（s），>0 
    //     allCommands.Add("0029", "DWORD "); //缺省时间汇报间隔，单位为秒（s），>0 
    //     allCommands.Add("002C", "DWORD "); //缺省距离汇报间隔，单位为米（m），>0 
    //     allCommands.Add("002D", "DWORD "); //驾驶员未登录汇报距离间隔，单位为米（m），>0 
    //     allCommands.Add("002E", "DWORD "); //休眠时汇报距离间隔，单位为米（m），>0 
    //     allCommands.Add("002F", "DWORD "); //紧急报警时汇报距离间隔，单位为米（m），>0 
    //     allCommands.Add("0030", "DWORD "); //拐点补传角度，<180 
    //     allCommands.Add("0031", "WORD  "); //电子围栏半径（非法位移阈值），单位为米 
    //     allCommands.Add("0040", "STRING"); //监控平台电话号码 
    //     allCommands.Add("0041", "STRING"); //复位电话号码，可采用此电话号码拨打终端电话让终端复位 
    //     allCommands.Add("0042", "STRING"); //恢复出厂设置电话号码，可采用此电话号码拨打终端电话让终端恢复出厂设置 
    //     allCommands.Add("0043", "STRING"); //监控平台 SMS 电话号码 
    //     allCommands.Add("0044", "STRING"); //接收终端 SMS 文本报警号码 
    //     allCommands.Add("0045", "DWORD "); //终端电话接听策略，0：自动接听；1：ACC ON 时自动接听，OFF 时手动接听 
    //     allCommands.Add("0046", "DWORD "); //每次最长通话时间，单位为秒（s），0 为不允许通话，"FFFFFFFF 为不限制 
    //     allCommands.Add("0047", "DWORD "); //当月最长通话时间，单位为秒（s），0 为不允许通话，"FFFFFFFF 为不限制 
    //     allCommands.Add("0048", "STRING"); //监听电话号码 
    //     allCommands.Add("0049", "STRING"); //监管平台特权短信号码 
    //     allCommands.Add("0050", "DWORD "); //报警屏蔽字，与位置信息汇报消息中的报警标志相对应，相应位为 1则相应报警被屏蔽 
    //     allCommands.Add("0051", "DWORD "); //报警发送文本 SMS 开关，与位置信息汇报消息中的报警标志相对应，相应位为 1 则相应报警时发送文本 SMS 
    //     allCommands.Add("0052", "DWORD "); //报警拍摄开关，与位置信息汇报消息中的报警标志相对应，相应位为1 则相应报警时摄像头拍摄 
    //     allCommands.Add("0053", "DWORD "); //报警拍摄存储标志，与位置信息汇报消息中的报警标志相对应，相应位为 1 则对相应报警时拍的照片进行存储，否则实时上传 
    //     allCommands.Add("0054", "DWORD "); //关键标志，与位置信息汇报消息中的报警标志相对应，相应位为 1 则对相应报警为关键报警 
    //     allCommands.Add("0055", "DWORD "); //最高速度，单位为公里每小时（km/h） 
    //     allCommands.Add("0056", "DWORD "); //超速持续时间，单位为秒（s） 
    //     allCommands.Add("0057", "DWORD "); //连续驾驶时间门限，单位为秒（s） 
    //     allCommands.Add("0058", "DWORD "); //当天累计驾驶时间门限，单位为秒（s） 
    //     allCommands.Add("0059", "DWORD "); //最小休息时间，单位为秒（s） 
    //     allCommands.Add("005A", "DWORD "); //最长停车时间，单位为秒（s） 
    //     allCommands.Add("005B", "WORD  "); //超速报警预警差值，单位为 1/10Km/h 
    //     allCommands.Add("005C", "WORD  "); //疲劳驾驶预警差值，单位为秒（s），>0 
    //     allCommands.Add("005D", "WORD  "); //碰撞报警参数设置： b7-b0： 碰撞时间，单位 4ms； b15-b8：碰撞加速度，单位 0.1g，设置范围在：0-79 之间，默认为10。 
    //     allCommands.Add("005E", "WORD  "); //侧翻报警参数设置： 侧翻角度，单位 1 度，默认为 30 度。 
    //     allCommands.Add("0064", "DWORD "); //定时拍照控制，见 表 13 
    //     allCommands.Add("0065", "DWORD "); //定距拍照控制，见 表 14 
    //     allCommands.Add("0070", "DWORD "); //图像/视频质量，1-10，1 最好 
    //     allCommands.Add("0071", "DWORD "); //亮度，0-255 
    //     allCommands.Add("0072", "DWORD "); //对比度，0-127 
    //     allCommands.Add("0073", "DWORD "); //饱和度，0-127 
    //     allCommands.Add("0074", "DWORD "); //色度，0-255 
    //     allCommands.Add("0080", "DWORD "); //车辆里程表读数，1/10km 
    //     allCommands.Add("0081", "WORD  "); //车辆所在的省域 ID 
    //     allCommands.Add("0082", "WORD  "); //车辆所在的市域 ID 
    //     allCommands.Add("0083", "STRING"); //公安交通管理部门颁发的机动车号牌 
    //     allCommands.Add("0084", "BYTE  "); // 车牌颜色，按照 JT/T415-2006 的 5.4.12 参数 ID 数据类型 描述及要求 
    //     allCommands.Add("0090", "BYTE  "); //GNSS 定位模式，定义如下： bit0，0：禁用 GPS 定位， 1：启用 GPS 定位； bit1，0：禁用北斗定位， 1：启用北斗定位； bit2，0：禁用 GLONASS 定位， 1：启用 GLONASS 定位； bit3，0：禁用 Galileo 定位， 1：启用 Galileo 定位。 
    //     allCommands.Add("0091", "BYTE  "); //GNSS 波特率，定义如下： "00：4800；"01：9600； "02：19200；"03：38400； "04：57600；"05：115200。 "0092 BYTE GNSS 模块详细定位数据输出频率，定义如下： "00：500ms；"01：1000ms（默认值）； "02：2000ms；"03：3000ms； "04：4000ms。 
    //     allCommands.Add("0093", "DWORD "); //GNSS 模块详细定位数据采集频率，单位为秒，默认为 1。 
    //     allCommands.Add("0094", "BYTE  "); //GNSS 模块详细定位数据上传方式： "00，本地存储，不上传（默认值）； "01，按时间间隔上传； "02，按距离间隔上传； "0B，按累计时间上传，达到传输时间后自动停止上传； "0C，按累计距离上传，达到距离后自动停止上传； "0D，按累计条数上传，达到上传条数后自动停止上传。 
    //     allCommands.Add("0095", "DWORD "); //GNSS 模块详细定位数据上传设置： 上传方式为 "01 时，单位为秒； 上传方式为 "02 时，单位为米； 上传方式为 "0B 时，单位为秒； 上传方式为 "0C 时，单位为米； 上传方式为 "0D 时，单位为条。 
    //     allCommands.Add("0100", "DWORD "); //CAN 总线通道 1 采集时间间隔(ms)，0 表示不采集 
    //     allCommands.Add("0101", "WORD  "); //CAN 总线通道 1 上传时间间隔(s)，0 表示不上传 
    //     allCommands.Add("0102", "DWORD "); //CAN 总线通道 2 采集时间间隔(ms)，0 表示不采集 
    //     allCommands.Add("0103", "WORD  "); //CAN 总线通道 2 上传时间间隔(s)，0 表示不上传 
    //     return allCommands;
    // }

    createNewListener() {
        var that=this;
        var listener = new BBSocket(5818);
        let reciveDataFunc = function (socket,message) {
            that.OnRecievedData(listener,socket,message);
        }
        let endFunc = function (socket) {
            console.log(`endFunc: socket -- ${socket.remoteAddress}  结束`);
        }
        let errorFunc = function (socket,error) {
            error && console.log(`errorFunc: ${error}`);
        }
        listener.connection(reciveDataFunc,endFunc,errorFunc);
        this.allListeners.push(listener);
    }

    /**
     * 处理接收到的消息
     * @param {*} listener 监视器
     * @param {*} socket 
     * @param {*} bufferMessage 接收到的原始消息
     */
    OnRecievedData(listener,socket,bufferMessage)
    {        
        //获取原始消息
        var messageStr = Helper.getOriginalMsg(bufferMessage);

        if (messageStr.split(' ').length <= 1) {
            console.log('请检查接收的内容是否正确：'+ bufferMessage);
            return;
        }
        console.log('收到：'+messageStr);//7e 01 00 00 2d 01 36 60 00 00 00 00 18 00 2c 01 2f 20 20 20 20 20 42 53 4a 2d 41 36 2d 42 00 00 00 00 00 00 00 00 00 00 00 00 31 31 31 31 31 31 31 02 d4 c1 42 59 38 33 39 37 17 7e 
        var msg = new MsgHelper(messageStr);
        console.log("收到数据IMEI:" + msg.header.IMEI);

        var _listener = listener,_socket = socket;
        if (msg.header.ID == "0100") // 终端注册
        {
            // console.log("消息为终端注册,开始组织通用应答.");
            let header = msg.header,body = msg._getBody_0100();
            if (body.plateColor == 0) { //车辆未上牌
                console.log('车辆未上牌');
                //返回注册消息应答
                BBPlugin.replyRegisterMsg(_listener,_socket,msg,'2');
                return;//不返回通用应答
            }
            NetWorkHelper.registerDevice(header.IMEI,body,function (result) {
                //返回注册消息应答
                BBPlugin.replyRegisterMsg(_listener,_socket,msg,result);
            });
            return;//不返回通用应答
        }else if (msg.header.ID == "0200") {//位置信息汇报
            let body = msg._getBody_0200();
            //更新数据信息
            NetWorkHelper.updatDeviceInfo(msg.header.IMEI,body.device,function (result) {
                //返回通用应答
                BBPlugin.replyGeneralMsg(_listener,_socket,msg,result);
            });
        }else if (msg.header.ID == "0107") {//查询终端属性应答 
            let body = msg._getBody_0107();
            console.log("制造商 ID:" + body.manufacturerID);
            console.log("终端型号:" + body.terminalType);
            console.log("终端ID:" + body.terminalID);
            console.log("ICCID:" + body.ICCID);
            // //返回通用应答
            // BBPlugin.replyGeneralMsg(_listener,_socket,msg,'0');//直接成功'0'
            //更新数据信息
            NetWorkHelper.update_0107_msg(msg.header.IMEI,body,function (result) {
                //返回通用应答
                BBPlugin.replyGeneralMsg(_listener,_socket,msg,result);
            });
        }else if (msg.header.ID == "0704") {//定位数据批量上传
            let body = msg._getBody_0704();
            //批量更新历史数据
            NetWorkHelper.updatDeviceHistory(msg.header.IMEI,body.devices,function (result) {
                //返回通用应答
                BBPlugin.replyGeneralMsg(_listener,_socket,msg,result);
            });
        }else if (msg.header.ID == "0102") {//终端鉴权
            console.log("收到数据IMEI:" + msg.header.IMEI);
            let body = msg._getBody_0102();
            console.log("鉴权码:" + body.authentication);
            // if (body.authentication === 'X') {//待处理
                //返回通用应答
                BBPlugin.replyGeneralMsg(_listener,_socket,msg,'0');//直接成功'0'
            // }

        }
    }

    /**
     * 注册消息回复
     * @param {*} listener 
     * @param {*} socket 
     * @param {MsgHelper} msg 消息
     * @param {*} result 结果(字符) -'0'：成功；'1'：车辆已被注册；'2'：数据库中无该车辆；'3'：终端已被注册；'4'：数据库中无该终端
     */
    static replyRegisterMsg(listener,socket,msg,result = '0') {
        let header = msg.header;
        // 生成终端注册应答消息头
        let returnHeader = MsgResHelper.creatMsgHeader('8100',header.bodyAttribute,header.IMEI,header.messageNum+1);
        // 生成 平台通用应答-8100 消息题
        let returnBody = MsgResHelper.creatMsgBody_8100(header.messageNum+1, result,'58')//发送的原始消息
        let returnArray = MsgResHelper.creatReturnMsg(returnHeader.concat(returnBody));
        console.log("终端注册:" + returnArray.join(' '));
        let returnByte = Helper.getByteBuffer(returnArray)
        //返回应答
        listener.sendMessage(socket,returnByte);
    }

    /**
     * 通用消息回复
     * @param {*} listener 
     * @param {*} socket 
     * @param {MsgHelper} msg 消息
     * @param {*} result 结果(字符) - 0：成功/确认；1：失败；2：消息有误；3：不支持；4：报警处理确认
     */
    static replyGeneralMsg(listener,socket,msg,result = '0') {
        let header = msg.header;
        // 生成 平台通用应答 消息头
        let returnHeader = MsgResHelper.creatMsgHeader('8001',header.bodyAttribute,header.IMEI,header.messageNum+1);
        // 生成 平台通用应答-8001 消息题
        let returnBody = MsgResHelper.creatMsgBody_8001(header.messageNum+1, header.ID,result);
        let returnArray = MsgResHelper.creatReturnMsg(returnHeader.concat(returnBody));
        console.log("平台通用应答:" + returnArray.join(' '));
        let returnByte = Helper.getByteBuffer(returnArray)
        //返回应答
        listener.sendMessage(socket,returnByte);
    }
}

module.exports = BBPlugin;

new BBPlugin();