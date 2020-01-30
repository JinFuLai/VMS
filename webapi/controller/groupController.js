var group = require('../model/gpstrack/group')
var reponseHelper = require('../helper/responsehelper')

// ----------------------------------Contorller-------------------------------------------
/**
 * @swagger
 * tags:
 *  - name: "groups"
 *    description: "分组"
 */
module.exports = function (app) {
    /**
     * @swagger
     * /api/group/list:
     *   post:
     *    tags:
     *    - groups  
     *    summary: "分组查询"
     *    produces:
     *    - application/json
     *    parameters:
     *    - name: group
     *      in: body
     *      description: "分组信息"
     *      required: false
     *      schema:
     *          $ref: '#/definitions/group'
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/group/list', function (req, res) {
        group.find(req.body).populate("account", "name").exec((err, groups) => {
            if (err) throw err;
            res.json(reponseHelper.Success(groups));
        });
    });

    /**
     * @swagger
     * /api/group/createVehicle:
     *   post: 
     *      tags:
     *          - groups
     *      produces:
     *      - application/json
     *      summary: "创建分组"
     *      parameters:
     *      - name: group
     *        in: body
     *        description: "分组信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/group'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/group/createVehicle', function (req, res) {
        var myData = new group(req.body);
        myData.save()
            .then(item => {
                res.json(reponseHelper.Success('添加成功'))
            })
            .catch(err => {
                res.json(reponseHelper.Error('添加失败' + err))
            });
    });
}