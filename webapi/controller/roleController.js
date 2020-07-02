var role = require('../model/account/role')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');   // https://www.npmjs.com/package/config
var reponseHelper = require('../helper/responsehelper');

/**
 * @swagger
 * tags:
 *  - name: "role"
 *    description: "角色"
 */
module.exports = function (app) {
  /**
   * @swagger
   * /api/role/list:
   *   post:
   *     tags:
   *       - role
   *     summary: "角色查询"
   *     description: Returns all role
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of role
   *         schema:
   *           $ref: '#/definitions/role'
   */
  // app.get('/role/list', function (req, res) {
  //   role.find({}, function (err, roles) {
  //     if (err) throw err;
  //     // object of all the role
  //     res.json(reponseHelper.Success(roles))
  //   });
  // });
  app.post('/role/list', function (req, res) {
    const { current = 1, pageSize = 10 } = req.body
    role.count(req.body, // 获取数据条数
      (err, total) => {//查询出结果返回
        if (err) {
          res.json(reponseHelper.Error(err));
        };
        role.find(req.body)
          .skip((current - 1) * pageSize)
          .limit(pageSize)
          .sort({ '_id': -1 })
          .exec((err, roles) => {
            if (err) {
              res.json(reponseHelper.Error(err));
            };
            res.json(reponseHelper.Success({ dataList: roles, pagination: { total, current, pageSize } }))
          });
      })
  });

    /**
   * @swagger
   * /api/role/update:
   *   post:
   *     tags:
   *       - role
   *     summary: 更新角色信息
   *     description: Returns a single puppy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: role's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single role
   *         schema:
   *           $ref: '#/api/role'
   */
  // /**
  //  * @swagger
  //  * /api/role/update:
  //  *   post:
  //  *     tags:
  //  *       - User
  //  *     summary: 更新角色信息
  //  *     produces:
  //  *       - application/json
  //  *     parameters:
  //  *       - name: body
  //  *         description: 参数
  //  *         in: body
  //  *         required: true
  //  *         schema:
  //  *           $ref: '#/definitions/role'
  //  *     responses:
  //  *       200:
  //  *         description: Successfully
  //  *         schema:
  //  *           $ref: '#/definitions/role'
  //  */

  app.post('/role/update', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 456) {
      res.json(resToken);
      return;
    }
    role.findByIdAndUpdate(req.body.id, req.body, { new: true }, function (err, updateRes) {
      if (err) {
        res.json({ success: false, code: 400, message: 'update failed. Wrong password.Please try again later!' });
      } else {
        // return the information including token as JSON        
        res.json(reponseHelper.createResponse(200, req.body, "update successful!"));

      }
    });
  });

  /**
   * @swagger
   * /api/role/create:
   *   post:
   *     tags:
   *       - role
   *     summary: 创建角色
   *     description: Creates a new role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/api/role'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post("/role/create", (req, res) => {
    var myData = new role(req.body);
    myData.save()
      .then(item => {
        res.json(reponseHelper.Success("添加成功"));
      })
      .catch(err => {
        res.json(reponseHelper.Error("添加失败。" + err));
      });
  });

  /**
   * @swagger
   * /api/role/delete:
   *   post:
   *     tags:
   *       - role
   *     summary: 删除角色
   *     description: Delete a role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/api/role'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.delete("/role/delete", (req, res) => {
    const id = req.body.id;
    const ids = id.split(',');
    role.remove({ _id: { $in: ids } }, function (err) {
      if (!err) {
        res.json(reponseHelper.Success("删除成功"));
      }
    });
  });
}

