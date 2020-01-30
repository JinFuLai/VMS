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
   *   get:
   *     tags:
   *       - role
   *     description: Returns all role
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of role
   *         schema:
   *           $ref: '#/definitions/role'
   */
  app.get('/role/list', function (req, res) {
    role.find({}, function (err, roles) {
      if (err) throw err;
      // object of all the role
      res.json(reponseHelper.Success(roles))
    });
  });

  /**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags:
 *       - role
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
  app.get('/role/role', function (req, res) {
    role.findById(req.query.id, function (err, role) {
      if (err) throw err;
      // object of all the role
      res.json(reponseHelper.Success(role))
    });
  });

  /**
   * @swagger
   * /api/role/create:
   *   post:
   *     tags:
   *       - role
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
    role.remove({ _id: req.query.id }, function (err) {
      res.json(reponseHelper.Success("删除成功"));
    });
  });
}