const Helper = require('./Helper');
const iconvLite = require('iconv-lite');

/**消息回复相关 */
class MsgResponseHelper {

    /**
     * 获取新的消息流水号
     * @param {*} num 原来的消息流水号
     * @param {*} value 增加量
     */
    static getNewMsgId(num,value)
    {
        var result = (num + value).toString(16);
        while (result.length < 4) {
            result = '0' + result;
        }
        return result.slice(0, 2) + ' ' + result.slice(2); 
    }

    /**
     * 生成新的消息数据头
     * @param {*} ID 消息ID(4位的16进制字符)
     * @param {*} bodyAttribute 消息体属性(16位的2进制字符)
     * @param {*} IMEI 终端手机号(12位的10进制字符)
     * @param {*} msgNum 消息流水号(数字)
     * @param {*} msgPackage 消息包封装项(2位16进制的字符数组)
     */
    static creatMsgHeader(ID,bodyAttribute,IMEI,msgNum,msgPackage=null){
        function getArray(str,totleNum){
            var newStr = str;
            var totle = totleNum != null ? totleNum : Math.ceil(str.length/2);
            var returnArray = new Array();
            while (newStr.length < totle*2) {
                newStr = '0' + newStr;
            }
            while (newStr.length > totle*2) {
                newStr = newStr.substring(1,newStr.length);
            }
            for (let index = 0; index < newStr.length; index++) {
                if ((index % 2 == 0) && (index < newStr.length)) {
                    const element = newStr.slice(index,index+2);
                    returnArray.push(element);
                }
            }
            return returnArray;
        }
        var array = new Array()
        //ID
        array.push(ID.slice(0,2),ID.slice(2,4));
        //bodyAttribute
        var bodyAttributeA = getArray(Helper.changeByteString(bodyAttribute,2,16,4),2)
        array = array.concat(bodyAttributeA);
        //IMEI
        if (IMEI) {
            var IMEIA = getArray(IMEI,6)
            array = array.concat(IMEIA);
        }
        //msgNum
        if (msgNum) {
            var numA = getArray(msgNum.toString(16),2)
            array = array.concat(numA);
        }
        //msgPackage
        if (msgPackage) {array = array.concat(msgPackage);}
        return array;
    }

    /**
     * 创建回复消息数组(添加校验码，并做一些转化处理)
     * @param {*} msg 消息数组[string]（包含消息头和消息体）
     */
    static creatReturnMsg(msg){
        var result = msg.join(' ');
        // 生成校验位(从消息头开始，同后一字节异或，直到校验码前一个字节，占用一个字节。)
        var verifyNumber = 0;
        for (let index = 0; index < msg.length; index++) {
            const element = msg[index];
            verifyNumber = verifyNumber ^ parseInt(element,16);
        }
        result += ` ${verifyNumber.toString(16)}`;
        result = result.replace("7d", "7d 01");
        result = result.replace("7e", "7d 02");

        result = `7e ${result} 7e`;
        return result.split(' ');
    }

    /**
     * 将字符串变为对应个数的数组（元素是2位如：['12','34','56'..]）
     * @param {*} str 原始字符串
     * @param {*} totleNum 个数
     */
    static getArray(str,totleNum){
        var newStr = str;
        var totle = totleNum != null ? totleNum : Math.ceil(str.length/2);
        var returnArray = new Array();
        while (newStr.length < totle*2) {
            newStr = '0' + newStr;
        }
        while (newStr.length > totle*2) {
            newStr = newStr.substring(1,newStr.length);
        }
        for (let index = 0; index < newStr.length; index++) {
            if ((index % 2 == 0) && (index < newStr.length)) {
                const element = newStr.slice(index,index+2);
                returnArray.push(element);
            }
        }
        return returnArray;
    }

    /**
     * 创建终端注册应答消息体-8100
     * @param {*} msgId 应答流水号 - 对应的终端注册消息的流水号 
     * @param {*} result 结果(字符) - 0：成功；1：车辆已被注册；2：数据库中无该车辆；3：终端已被注册；4：数据库中无该终端 
     * @param {*} token 鉴权码(字符) - 只有在成功后才有该字段
     */
    static creatMsgBody_8100(msgId,result,token=null){
        var array = new Array()
        //msgId
        array = array.concat(MsgResponseHelper.getArray(msgId.toString(16),2));
        //result
        array = array.concat(MsgResponseHelper.getArray(result,1));
        //token
        if (token) {array = array.concat(MsgResponseHelper.getArray(token,1));}
        return array;
    }

    /**
     * 创建平台通用应答消息体-8001
     * @param {*} msgId 应答流水号(数字) - 对应的终端注册消息的流水号 (如：12)
     * @param {*} responseId 应答ID(字符串) - 对应的终端消息的ID (如：'0100')
     * @param {*} result 结果(字符) - 0：成功；1：车辆已被注册；2：数据库中无该车辆；3：终端已被注册；4：数据库中无该终端 
     */
    static creatMsgBody_8001(msgId,responseId,result){
        var array = new Array()
        //msgId
        array = array.concat(MsgResponseHelper.getArray(msgId.toString(16),2));
        //responseId
        array = array.concat(MsgResponseHelper.getArray(responseId,2));
        //result
        array = array.concat(MsgResponseHelper.getArray(result,1));
        return array;
    }
}

module.exports = MsgResponseHelper;