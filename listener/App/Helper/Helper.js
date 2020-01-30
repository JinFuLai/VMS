class Helper {

    /**
     * 获取原始消息字符串
     * @param {*} buffer 
     */
    static getOriginalMsg(buffer){
        var result = '';
        buffer.map(function (item,index,array) {
            result = result + Helper.changeByteString(parseInt(item,10).toString(16),16,16,2) + ' ';
        });
        result = result.trim();
        return result;
    }
    
    /**
     * 将字符串数组转换为Buffer
     * @param {*} messageArray 
     */
    static getByteBuffer(messageArray){
        var resultArray = new Array(); 
        messageArray.map(function (item,index,array) {
            resultArray.push(parseInt(item,16));
        });
        let returnBuffer = new Buffer.from(resultArray);
        return returnBuffer;
    }

    /**
     * 将对应编码数组，转换为字符数组
     * @param {*} array 数组【编码】
     * @param {*} from 原数组编码的进制2,8,16..
     */
    static getStringFrom(array,from = 10){
        var result = new Array();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            result.push(String.fromCharCode(parseInt(element,from)))
        }
        return result;
    }

    /**
     * 获取相应格式的字符串
     * @param {*} str 原始字符
     * @param {*} from 原始进制 2,8,10,16(默认10)
     * @param {*} to 目标进制 2,8,10,16(默认2)
     * @param {*} digits 位数 1,2,4,8,16,32(默认16)
     */
    static changeByteString(str,from = 10,to = 2,digits = 16) {
        let fromType = from === 16 ? 16 : from === 10 ? 10 : from === 8 ? 8 : from === 2 ? 2 : 10
        let toType = to === 16 ? 16 : to === 10 ? 10 : to === 8 ? 8 : 2
        var result = parseInt(str,fromType).toString(toType);
        while (result.length < digits) {
            result = "0" + result;
        }
        return result;
    }
    /**
     * 判断字符串中某一位置的是否是指定字符
     * @param {*} str 字符串
     * @param {*} index 位置
     * @param {*} targe 指定的内容
     */
    static isEqualTo(str,index,targe) {
        if (targe.length <= 0 || str.length < index + targe.length){
            return false;
        }else if (targe.length === 1) {
            return (str.charAt(index) === targe) 
        }else {
            return ('str'.substring(index,index + targe.length) === targe)
        }
    }
}

module.exports = Helper;