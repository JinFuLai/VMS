var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');   // https://www.npmjs.com/package/config
var reponseHelper = require('../helper/responsehelper');
var system = require('../model/system/app');

/**
 * @swagger
 * tags:
 *  - name: "System"
 *    description: "系统设置"
 */
module.exports = function (app) {

  /**
   * @swagger
   * /api/system/maptype:
   *   get:
   *    tags:
   *    - System  
   *    summary: "地图类型(0-百度，1-谷歌)"
   *    produces:
   *    - application/json
   *    responses:
   *      200:
   *          description: Successfully   
   */
  app.get('/system/maptype', function (req, res) {
    system.find({}, function (err, appConfig) {
      if (err) {
        res.json(reponseHelper.Error(err))
      };
      if (appConfig && appConfig[0] && appConfig[0].mapType) {
        res.json(reponseHelper.Success(appConfig[0].mapType));
      }else{
        //默认返回0
        res.json(reponseHelper.Success(0));
      }
    });
  });

  /**
   * @swagger
   * /api/system/setmaptype:
   *   post:
   *    tags:
   *    - System  
   *    summary: "设置地图类型(0-百度，1-谷歌)"
   *    produces:
   *    - application/json
   *    parameters:
   *       - name: mapType
   *         type: integer
   *         description: 地图类型
   *         in: query
   *         required: true
   *    responses:
   *      200:
   *          description: Successfully   
   */
  app.post('/system/setmaptype', function (req, res) {
    var { mapType } = req.query;
    if (!mapType || !(mapType == 0 || mapType == 1)) {
        res.json(reponseHelper.ParameterError());
        return;
    }
    system.find({}, function (err, appConfig) {
      if (err) {
        res.json(reponseHelper.Error(err))
      };
      if (appConfig && appConfig[0]) {
        appConfig[0].updateOne(req.query, function (err, saveResult) {
          if (err) {
            res.json(reponseHelper.Error(err))
          }
          if (saveResult) {
            res.json(reponseHelper.Success());
          }
        });
      }else{
        var myData = new system(req.query);
        myData.save()
            .then(item => {
                res.json(reponseHelper.Success());
            })
            .catch(err => {
                res.json(reponseHelper.Error(err));
            });
      }
    });
  });

}