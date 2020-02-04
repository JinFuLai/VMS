const consts = require('./consts');

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

    /**
     * 判断两个时间点的间隙，是否小于规定时间
     * @param {*} fistTime 第一个时间点
     * @param {*} secondTime 第二个时间点
     */
    static withinTheSpecifiedTime(fistTime,secondTime) {
        if (fistTime && secondTime) {
            const result = Date(fistTime) - Date(secondTime);
            const limit = consts.LIMIT_CONDITIONS.MAX_TIME * 60 * 1000
            if ( result <= limit || result >= -limit) {
                return true;
            } else {
                return false;
            }
        }else{
            return false;
        }
    }

    /**
     * 计算经纬度见的距离
     * @param {*} lng1 
     * @param {*} lat1 
     * @param {*} lng2 
     * @param {*} lat2 
     */
    static getDistance(lng1, lat1, lng2, lat2) {
        if (lng1 && lat1 && lng2 && lat2) {
            var EARTH_RADIUS = 6378.137; //地球半径  
            //将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
            function rad(d) {
                return d * Math.PI / 180.0;
            }
            var radLat1 = rad(lat1);
            var radLat2 = rad(lat2);
            var a = radLat1 - radLat2;
            var b = rad(lng1) - rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
            s = s * EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000;
            return s;   
        } else {
            return 0;
        }
    }
}

module.exports = Helper;