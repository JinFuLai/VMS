const reponseHelper = require('../helper/responsehelper');
const geographical = require('../model/geographical');
// const http = require('http');
var request = require("request");

/**
 * 对接收到的经度（纬度）做一些处理
 * @param {*} data 
 */
function getStandardString(data) {
    var array = parseFloat(data).toFixed(3).toString().split('.');
    var first = array[0] ?  array[0] : '000';
    var second = array[1] ? array[1] : '000';
    if (first.length > 3 || second.length > 3) {
        return ['err',null];
    }
    while (first.length < 3) {
        first = `0${first}`;
    }
    while (second.length < 3) {
        second = `0${second}`;
    }
    var result = `${first}.${second}`;
    return result;
}
/**
 * @swagger
 * tags:
 *  - name: "app"
 *    description: "APP相关接口"
 */
module.exports = function (app) {
 /**
   * @swagger
   * /api/app/geocoder:
   *   post:
   *    tags:
   *    - app  
   *    summary: "根据经纬度获取具体位置信息"
   *    produces:
   *    - application/json
   *    parameters:
   *       - name: longitude
   *         type: number
   *         description: 经度
   *         in: query
   *         required: true
   *       - name: latitude
   *         type: number
   *         description: 纬度
   *         in: query
   *         required: true
   *    responses:
   *      200:
   *          description: Successfully   
   */
  app.post('/app/geocoder', function (req, res) {
    const {longitude, latitude} = req.query;
    if (!longitude || !(longitude)) {
        res.json(reponseHelper.ParameterError());
        return;
    }
    longitudeStr = getStandardString(longitude);
    latitudeStr = getStandardString(latitude);
    const key = `${longitudeStr}_${latitudeStr}`;
    geographical.find({key: key}, function (err, appConfig) {
        if (err) {
            //查询出错
            res.json(reponseHelper.Error(err));
        }
        if (appConfig && appConfig.length > 0) {
            ///数据存在
            res.json(reponseHelper.Success(appConfig[0]));
        } else {
            ///不存在在数据，查询百度接口
            request(`http://api.map.baidu.com/reverse_geocoding/v3/?ak=BOrl4tlIQ1Rx22FI0tRrRE5MmLnob6Hk&output=json&coordtype=wgs84ll&location=${parseFloat(latitudeStr)},${parseFloat(longitudeStr)}`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var bodyJson = JSON.parse(body);
                    if (bodyJson != undefined && bodyJson.status != undefined && bodyJson.status == 0 && bodyJson.result) {
                        res.json(reponseHelper.Success(bodyJson.result.formatted_address));
                    }else{
                        res.json(reponseHelper.Error(response.statusMessage));
                    }
                }else{
                    if (error) {
                        res.json(reponseHelper.Error(error));
                    } else {
                        res.json(reponseHelper.Error(response.statusMessage));
                    }
                }
            });
        }
    })
  });
}