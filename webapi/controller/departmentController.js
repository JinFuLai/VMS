var department = require('../model/account/department')
var reponseHelper = require('../helper/responsehelper')

/**
 * @swagger
 * tags:
 *  - name: "department"
 *    description: "部门"
 */
module.exports = function (app) {
/**
   * @swagger
   * /api/department/list:
   *   post:
   *     tags:
   *       - department
   *     summary: "部门查询"
   *     description: Returns all department
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of department
   *         schema:
   *           $ref: '#/definitions/department'
   */
 
  app.post('/department/list', function (req, res) {
    const { current = 1, pageSize = 10 } = req.body
    department.count(req.body, // 获取数据条数
      (err, total) => {//查询出结果返回
        if (err) {
          res.json(reponseHelper.Error(err));
        };
        department.find(req.body)
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
   * /api/department/update:
   *   post:
   *     tags:
   *       - department
   *     summary: 更新部门信息
   *     description: Returns a single puppy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: department's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single department
   *         schema:
   *           $ref: '#/api/department'
   */
  

  app.post('/department/update', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 456) {
      res.json(resToken);
      return;
    }
    department.findByIdAndUpdate(req.body.id, req.body, { new: true }, function (err, updateRes) {
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
   * /api/department/create:
   *   post:
   *     tags:
   *       - department
   *     summary: 创建部门
   *     description: Creates a new department
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: department
   *         description: department object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/api/department'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post("/department/create", (req, res) => {
    var myData = new department(req.body);
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
   * /api/department/delete:
   *   post:
   *     tags:
   *       - department
   *     summary: 删除部门
   *     description: Delete a department
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: department object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/api/department'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.delete("/department/delete", (req, res) => {
    const id = req.body.id;
    const ids = id.split(',');
    department.remove({ _id: { $in: ids } }, function (err) {
      if (!err) {
        res.json(reponseHelper.Success("删除成功"));
      }
    });
  });
}