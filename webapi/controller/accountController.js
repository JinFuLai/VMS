var account = require('../model/account/account')
var contactSchema = require('../model/schema/contactSchema')
var group = require('../model/gpstrack/group')
var state = require('../model/address/state')
var country = require('../model/address/country')
var reponseHelper = require('../helper/responsehelper')

// ----------------------------------Contorller-------------------------------------------
/**
 * @swagger
 * tags:
 *  - name: "Account"
 *    description: "公司"
 */
module.exports = function (app) {
  /**
   * @swagger
   * /api/account/list:
   *   post:
   *     tags:
   *       - Account
   *     summary: "公司查询"
   *     produces:
   *     - application/json
   *     responses:
   *       200:
   *         description: An array of accounts
   */
  // app.post('/account/list', function (req, res) {

  //   account.find().populate({ path: 'address.city' })
  //     .populate({
  //       path: 'address.city', populate: {
  //         path: 'state',
  //         model: state,
  //         populate: {
  //           path: 'country',
  //           model: country,
  //         }
  //       }
  //     }).exec(function (err, accounts) {
  //       if (err) throw err;
  //       res.json(reponseHelper.Success(accounts));
  //     });

  //   // account.find({}, function (err, accounts) {
  //   //     if (err) throw err;
  //   //     // object of all the accounts
  //   //     res.json(reponseHelper.createResponse(200, accounts, "OK"));
  //   // });
  // });
  app.post('/account/list', function (req, res) {
    const { current = 1, pageSize = 10 } = req.body
    account.count(req.body, // 获取数据条数
      (err, total) => {//查询出结果返回
        if (err) {
          res.json(reponseHelper.Error(err));
        };
        account.find(req.body)
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
   * /api/account/create:
   *   post: 
   *      tags:
   *          - Account
   *      produces:
   *      - application/json
   *      summary: "创建公司"
   *      parameters:
   *      - name: account
   *        in: body
   *        description: "公司信息"
   *        required: true
   *        schema:
   *          $ref: '#/definitions/account'
   *      responses:
   *          200:
   *              description: Successfully     
   */
  app.post('/account/create', function (req, res) {
    var myData = new account(req.body);
    myData.save()
      .then(item => {
        res.json(reponseHelper.Success('添加成功'))
      })
      .catch(err => {
        res.json(reponseHelper.Error('添加失败' + err))
      });
  });

  /**
* @swagger
* /api/account/groups:
*   get:
*     tags:
*       - Account
*     description: Returns all groups for account
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of accounts
*/
  app.get('/account/groups', function (req, res) {
    group.find({ account_id: req.query.id }, function (err, groups) {
      if (err) throw err;
      // object of all the accounts
      res.json(reponseHelper.Success(groups));
    });
  });

  /**
* @swagger
* /api/account/upsert:
*   post:
*     tags:
*       - Account
*     description: Creates a new account
*     produces:
*       - application/json
*     parameters:
*       - name: account
*         description: Account object
*         in: body
*         required: true
*         schema:
*            $ref: '#/definitions/account'
*     responses:
*       200:
*         description: Successfully created
*/
  app.post("/account/upsert", (req, res) => {
    var myData = new account(req.body);
    account.findOneAndUpdate({
      _id: myData.id
    }, myData, { upsert: true, new: true }, function (err, _account) {
      if (err) throw err;
      res.json(reponseHelper.Success(_account));
    });
  });

  /**
* @swagger
* /api/account/delete:
*   post:
*     tags:
*       - Account
*     description: Delete a account
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: Account object
*         in: body
*         required: true
*         schema:
*            $ref: '#/definitions/account'
*     responses:
*       200:
*         description: Successfully created
*/
  app.delete("/account/delete", (req, res) => {
    const id = req.body.id;
    const ids = id.split(',');
    account.remove({ _id: { $in: ids } }, function (err) {
      if (!err) {
        res.json(reponseHelper.Success("删除成功"));
      }
    });
  });

  /**
* @swagger
* /api/account/createContacts:
*   post:
*     tags:
*       - Account
*     summary: 添加联系人
*     description: Delete a account
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: Account object
*         in: body
*         required: true
*         schema:
*            $ref: '#/definitions/account'
*     responses:
*       200:
*         description: Successfully created
*/
  app.post("/account/createContacts", (req, res) => {  //暂时不用
    var myData = new account(req.body);
    myData.save()
      .then(item => {
        res.json(reponseHelper.Success('添加成功'))
      })
      .catch(err => {
        res.json(reponseHelper.Error('添加失败' + err))
      });
  });
    /**
   * @swagger
   * /api/account/update:
   *   post:
   *     tags:
   *       - account
   *     summary: 更新公司信息
   *     description: Returns a single puppy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: account's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single account
   *         schema:
   *           $ref: '#/api/account'
   */
  

  app.post('/account/update', function (req, res) {
    let resToken = reponseHelper.check(req.headers)
    if (resToken.code !== 456) {
      res.json(resToken);
      return;
    }
    account.findByIdAndUpdate(req.body.id, req.body, { new: true }, function (err, updateRes) {
      if (err) {
        res.json({ success: false, code: 400, message: 'update failed. Wrong password.Please try again later!' });
      } else {
        // return the information including token as JSON        
        res.json(reponseHelper.createResponse(200, req.body, "update successful!"));

      }
    });
  });
}