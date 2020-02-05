var user = require('../model/account/user')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');   // https://www.npmjs.com/package/config
var reponseHelper = require('../helper/responsehelper');

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
    res.json(reponseHelper.Success(0));
  });
}