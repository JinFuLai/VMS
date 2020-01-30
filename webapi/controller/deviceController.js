const device = require('../model/gpstrack/device')
const manufactor = require('../model/entity/manufactor')
const reponseHelper = require('../helper/responsehelper');

/**
 * @swagger
 * tags:
 *  - name: "device"
 *    description: "设备"
 */
module.exports = function (app) {
    /**
     * @swagger
     * /api/device/createManufactor:
     *   post: 
     *      tags:
     *          - device
     *      produces:
     *      - application/json
     *      summary: "创建设备生产厂家"
     *      parameters:
     *      - name: manufactor
     *        in: body
     *        description: "设备生产厂家信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/manufactor'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/device/createManufactor', function (req, res) {
        var myData = new manufactor(req.body);
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
     * /api/device/createDevice:
     *   post: 
     *      tags:
     *          - device
     *      produces:
     *      - application/json
     *      summary: "创建设备信息"
     *      parameters:
     *      - name: device
     *        in: body
     *        description: "设备信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/device'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/device/createDevice', function (req, res) {
        var myData = new device(req.body);
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
     * /api/device/list:
     *   post: 
     *      tags:
     *          - device
     *      produces:
     *      - application/json
     *      summary: "设备信息查询"
     *      parameters:
     *      - name: device
     *        in: body
     *        description: "设备信息"
     *        required: false
     *        schema:
     *          $ref: '#/definitions/device'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/device/list', function (req, res) {
        device.find(req.body, function (err, vehicleAll) {
            if (err) throw err;
            res.json(reponseHelper.Success(vehicleAll))
        });
    });
}