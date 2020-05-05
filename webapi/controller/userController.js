var user = require('../model/account/user')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');   // https://www.npmjs.com/package/config
var reponseHelper = require('../helper/responsehelper');
var feedback = require('../model/account/feedback');
var qiniu = require('qiniu');
var Formidable = require('formidable'),
  http = require('http'),
  util = require('util'),
  fs = require("fs");

/**
 * @swagger
 * tags:
 *  - name: "User"
 *    description: "用户"
 */
module.exports = function (app) {

  /**
   * @swagger
   * /api/user/list:
   *   post:
   *    tags:
   *    - User  
   *    summary: "用户查询"
   *    produces:
   *    - application/json
   *    parameters:
   *    - name: user
   *      in: body
   *      description: "用户信息"
   *      required: false
   *      schema:
   *          $ref: '#/definitions/user'
   *    responses:
   *      200:
   *          description: Successfully   
   */
  app.post('/user/list', function (req, res) {
    const { current = 1, pageSize = 10 } = req.body
    user.count(req.body, // 获取数据条数
      (err, total) => {//查询出结果返回
        if (err) {
          res.json(reponseHelper.Error(err));
        };
        user.find(req.body)
          .skip((current - 1) * pageSize)
          .limit(pageSize)
          .sort({ '_id': -1 })
          .exec((err, users) => {
            if (err) {
              res.json(reponseHelper.Error(err));
            };
            res.json(reponseHelper.Success({ dataList: users, pagination: { total, current, pageSize } }))
          });
      })
  });

  /**
 * @swagger
 * /api/user/user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/user'
 */
  app.get('/user/user', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 200) {
      res.json(resToken);
      return;
    }
    user.findById(resToken.data, function (err, user) {
      if (err) {
        res.json(reponseHelper.Error(err))
      };
      // object of all the user
      res.json(reponseHelper.Success(user))
    });
  });

  /**
   * @swagger
   * /api/user/create:
   *   post:
   *     tags:
   *       - User
   *     summary: 创建用户
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/user'
   *     responses:
   *       200:
   *         description: Successfully
   */
  app.post("/user/create", async function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.json(reponseHelper.ParameterError());
      return;
    }
    var old = await user.findByUserName(req.body.username);
    if (old.length !== 0) {
      res.json(reponseHelper.Error('用户已存在'))
    } else {
      var myData = new user(req.body);
      myData.save()
        .then(item => {
          res.json(reponseHelper.Success('用户注册成功'))
        })
        .catch(err => {
          res.json(reponseHelper.Error('用户注册失败'))
        });
    }
  });

  /**
* @swagger
* /api/user/delete:
*   post:
*     tags:
*       - User
*     summary: 删除用户
*     description: Delete a user
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: User object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/user'
*     responses:
*       200:
*         description: Successfully
*/
  app.delete("/user/delete", (req, res) => {
    user.remove({ _id: req.query.id }, function (err) {
      if (!err) {
        res.json(reponseHelper.Success("删除成功"));
      }
    });
  });

  /**
  * @swagger
  * /api/user/login:
  *   post:
  *     tags:
  *       - User
  *     summary: 登录
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successfully
  *         schema:
  *           $ref: '#/definitions/user'
  */
  app.post('/user/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.json(reponseHelper.ParameterError());
      return;
    }
    // find the user
    user.find({
      username: req.body.username
    }, function (err, _users) {
      if (err) {
        res.json(reponseHelper.Error(err));
      } err;
      if (_users.length == 0) {
        res.json(reponseHelper.createResponse(211, null, 'Login failed. User not found.'));
      } else {
        var _user;
        for (const key in _users) {
          if (_users.hasOwnProperty(key)) {
            const element = _users[key];
            if (element.password == req.body.password) {//暂时只取出第一个
              _user = element
              break
            }
          }
        }
        if (!_user) {
          res.json(reponseHelper.createResponse(400, null, 'Login failed. Wrong password.'));
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          var token = reponseHelper.createToken(_user.id);
          if (token == null) {
            res.json(reponseHelper.createResponse(400, null, 'Cannot create token. Wrong password.Please try again later!'));
            return;
          }
          _user.token = token;
          user.findByIdAndUpdate(_user.id, { token: token }, { new: true }, function (err, updateRes) {
            if (err) {
              res.json(reponseHelper.createResponse(400, null, 'Login failed. Wrong password.Please try again later!'));
            } else {
              // return the information including token as JSON
              res.json(reponseHelper.createResponse(200, _user, "Login successful!"));
            }
          });
        }
      }
    })
  });

  /**
  * @swagger
  * /api/user/update:
  *   post:
  *     tags:
  *       - User
  *     summary: 更新用户信息
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: 参数
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/user'
  *     responses:
  *       200:
  *         description: Successfully
  *         schema:
  *           $ref: '#/definitions/user'
  */
  app.post('/user/update', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 200) {
      res.json(resToken);
      return;
    }
    user.findByIdAndUpdate(resToken.data, req.body, { new: true }, function (err, updateRes) {
      if (err) {
        res.json({ success: false, code: 400, message: 'update failed. Wrong password.Please try again later!' });
      } else {
        // return the information including token as JSON        
        res.json(reponseHelper.createResponse(200, updateRes, "update successful!"));

      }
    });
  });

  /**
  * @swagger
  * /api/user/changePassword:
  *   post:
  *     tags:
  *       - User
  *     summary: 修改用户密码
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: 参数
  *         in: body
  *         required: true
  *         schema:
  *           title: login
  *           properties:
  *             verification:
  *               type: string
  *               description: 验证码
  *               default: 验证码
  *             password:
  *               type: string
  *               description: 密码
  *               default: 密码
  *             confirm:
  *               type: string
  *               description: 确认密码
  *               default: 确认密码
  *           required: 
  *             - verification
  *             - password
  *             - confirm
  *     responses:
  *       200:
  *         description: Successfully
  *         schema:
  *           $ref: '#/definitions/user'
  */
  app.post('/user/changePassword', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 200) {
      res.json(resToken);
      return;
    }

    if (req.body.verification) {//TODO:需要对验证码进行验证
    }

    if (req.body.password && req.body.confirm && req.body.password === req.body.confirm) {
      user.findByIdAndUpdate(resToken.data, { password: req.body.password }, { new: true }, function (err, updateRes) {
        if (err) {
          res.json(reponseHelper.Error('Error. Please try again later!'));
        } else {
          res.json(reponseHelper.createResponse(200, updateRes, "Modify the success"));
        }
      });
    } else {
      res.json(reponseHelper.ParameterError());
    }
  });

  /**
  * @swagger
  * /api/user/feedback:
  *   post:
  *     tags:
  *       - User
  *     summary: 意见反馈
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: 参数
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/feedback'
  *     responses:
  *       200:
  *         description: Successfully
  */
  app.post('/user/feedback', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 200) {
      res.json(resToken);
      return;
    }
    if (!req.body) {
      res.json(reponseHelper.ParameterError());
      return;
    }

    req.body.create_by = resToken.data;
    let newFB = new feedback(req.body);
    newFB.save()
      .then(item => {
        res.json(reponseHelper.Success());
      })
      .catch(err => {
        res.json(reponseHelper.Error('Error. Please try again later!'));
      });
  });

  /**
  * @swagger
  * /api/user/updatePhoto:
  *   post:
  *     tags:
  *       - User
  *     summary: 上传头像
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: photo
  *         description: 参数
  *         in: body
  *         required: true
  *         type: file
  *     responses:
  *       200:
  *         description: Successfully
  */
  app.post('/user/updatePhoto', function (req, res) {

    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 200) {
      res.json(resToken);
      return;
    }
    // 读取上传文件
    var form = new Formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.json(reponseHelper.Error(err));
        return;
      }
      if (!(files.photo && files.photo.path)) {
        res.json(reponseHelper.ParameterError());
        return
      }
      //解析为流
      var inputStream = fs.createReadStream(files.photo.path)

      // if (!req.body.photo) {
      //   res.json(reponseHelper.ParameterError());
      //   return;
      // }

      // res.json(reponseHelper.Error('功能尚未开通，请稍后重试'));

      // return;

      var config = new qiniu.conf.Config();
      // 空间对应的机房
      config.zone = qiniu.zone.Zone_z2;
      // 是否使用https域名
      //config.useHttpsDomain = true;
      // 上传是否使用cdn加速
      //config.useCdnDomain = true;

      var accessKey = 'UGKdQUA6888553Gbui0DmPa3L7qTFww5jUyRzyz4';
      var secretKey = 'vWiICPRWVjCSg11l9-GrvJtigv_E1iscy3r6KE77';
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

      var keyname = resToken.data + '-' + files.photo.name;
      var options = {
        scope: 'jfl-vehiclemanage' + ":" + keyname//覆盖上传才加 + ":" + keyname
      }
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken = putPolicy.uploadToken(mac);

      var formUploader = new qiniu.form_up.FormUploader(config);
      var putExtra = new qiniu.form_up.PutExtra();
      // 文件上传
      formUploader.putStream(uploadToken, keyname, inputStream, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
          res.json(reponseHelper.Error(respErr));
        }
        if (respInfo && respInfo.statusCode == 200) {
          res.json(reponseHelper.Success('http://q3d8ttj64.bkt.clouddn.com/' + keyname));
        } else {
          res.json(reponseHelper.Error());
        }
      });
    });
  });
}