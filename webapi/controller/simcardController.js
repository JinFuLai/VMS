const simcard = require('../model/entity/simcard')
const simcardType = require('../model/entity/simcard_type')
const reponseHelper = require('../helper/responsehelper');

/**
 * @swagger
 * tags:
 *  - name: "simcard"
 *    description: "SIMCard信息"
 */
module.exports = function (app) {

    /**
     * @swagger
     * /api/simcard/list:
     *   post:
     *    tags:
     *    - simcard  
     *    summary: "SIMCard信息查询"
     *    produces:
     *    - application/json
     *    parameters:
     *    - name: simcard
     *      in: body
     *      description: "SIMCard信息"
     *      required: false
     *      schema:
     *          $ref: '#/definitions/simcard'
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/simcard/list', function (req, res) {
        simcard.find(req.body).populate('simcard_type', 'name').exec((err, vehicleAll) => {
            if (err) throw err;
            res.json(reponseHelper.Success(vehicleAll))
        });
    });

    /**
     * @swagger
     * /api/simcard/createSimcard:
     *   post: 
     *      tags:
     *          - simcard
     *      produces:
     *      - application/json
     *      summary: "创建SIMCard"
     *      parameters:
     *      - name: simcard
     *        in: body
     *        description: "SIMCard信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/simcard'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/simcard/createSimcard', function (req, res) {
        var myData = new simcard(req.body);
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
     * /api/simcard/createSimcardType:
     *   post: 
     *      tags:
     *          - simcard
     *      produces:
     *      - application/json
     *      summary: "创建SIMCard类型"
     *      parameters:
     *      - name: simcardType
     *        in: body
     *        description: "SIMCard类型信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/simcard_type'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/simcard/createSimcardType', function (req, res) {
        var myData = new simcardType(req.body);
        myData.save()
            .then(item => {
                res.json(reponseHelper.Success('添加成功'))
            })
            .catch(err => {
                res.json(reponseHelper.Error('添加失败' + err))
            });
    });
}