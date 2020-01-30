const vehicle = require('../model/vehicle/vehicle')
const vehicleType = require('../model/vehicle/vehicle_type')
const vehicleBrand = require('../model/vehicle/vehicle_brand')
const vehicleColor = require('../model/vehicle/vehicle_color')
const reponseHelper = require('../helper/responsehelper');
const consts = require("../consts");
const location = require('../model/gpstrack/location');

/**
 * @swagger
 * tags:
 *  - name: "vehicle"
 *    description: "车辆"
 */
module.exports = function (app) {

    /**
     * @swagger
     * /api/vehicle/history:
     *   post:
     *    tags:
     *    - vehicle  
     *    summary: "获取车辆的历史轨迹"
     *    produces:
     *    - application/json
     *    parameters:
     *       - name: deviceID
     *         type: string
     *         description: 设备id
     *         in: query
     *         required: true
     *       - name: start
     *         type: string
     *         description: 开始时间
     *         in: query
     *         required: false
     *       - name: end
     *         type: string
     *         description: 结束时间
     *         in: query
     *         required: false
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/vehicle/history', function (req, res) {
        var { deviceID, start ,end } = req.query;
        // location.find({'device.imei': imei})
        location.find({'device': deviceID})
            .populate('device')
            .populate('vehicle')
            // .populate('driver')//有问题😓
            .populate('group')
            .exec((err, docs) => {
                console.log(err);
                console.log(docs);
                if (err) {
                    res.json(reponseHelper.Error('failed.Please try again later!'));
                    return;
                }
                res.json(reponseHelper.Success(docs));
            });
    });

    /**
     * @swagger
     * /api/vehicle/alarmMessage:
     *   post:
     *    tags:
     *    - vehicle  
     *    summary: "获取车辆的告警消息列表"
     *    produces:
     *    - application/json
     *    parameters:
     *       - name: id
     *         type: string
     *         description: 车辆id
     *         in: query
     *         required: true
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/vehicle/alarmMessage', function (req, res) {
        console.log('adsfs');
        //TO DO暂未处理
        res.json(reponseHelper.Success([]));
    });

    /**
     * @swagger
     * /api/vehicle/all:
     *   get:
     *    tags:
     *    - vehicle  
     *    summary: "获取所有车辆"
     *    produces:
     *    - application/json
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.get('/vehicle/all', function (req, res) {
        vehicle.find({})
            .populate("account", "name")
            .populate("vehicle_type", "name")
            .populate("vehicle_brand", "name")
            .populate("vehicle_color", "name")
            .populate("group", "name")
            .populate('device')
            .exec((err, vehicleAll) => {
                if (err) {
                    res.json(reponseHelper.Error('failed.Please try again later!'));
                    return;
                }
                if (vehicleAll) {                             
                    res.json(reponseHelper.Success(vehicleAll));
                }
            });
    });

    /**
     * @swagger
     * /api/vehicle/location:
     *   post:
     *    tags:
     *    - vehicle  
     *    summary: "根据车辆id获取位置信息"
     *    produces:
     *    - application/json
     *    parameters:
     *       - name: id
     *         description: 车辆id
     *         in: body
     *         required: true
     *         schema:
     *           properties:
     *             id:
     *               type: string
     *               description: 车辆id
     *           required: 
     *             - id
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/vehicle/location', function (req, res) {
        let id = req.body.id;
        if (!id) {
            res.json(reponseHelper.ParameterError());
            return;
        }
        vehicle.findById(id)
            .populate("account", "name")
            .populate("vehicle_type", "name")
            .populate("vehicle_brand", "name")
            .populate("vehicle_color", "name")
            .populate("group", "name")
            .populate('device')
            .exec((err, vehicleAll) => {
                if (err) {
                    res.json(reponseHelper.Error('failed.Please try again later!'));
                    return;
                }
                if (vehicleAll) {
                    res.json(reponseHelper.Success(vehicleAll));
                }
            });
    });

    /**
     * @swagger
     * /api/vehicle/search:
     *   post:
     *    tags:
     *    - vehicle  
     *    summary: "根据车牌号或者IMEI码查询相关车辆(可选择模糊查询)"
     *    produces:
     *    - application/json
     *    parameters:
     *       - name: keyword
     *         type: string
     *         description: 关键字（请输入车牌号或者IMEI码）
     *         in: query
     *         required: true
     *       - name: fuzzy
     *         type: boolean
     *         description: 是否模糊查询(默认false)
     *         required: false
     *         in: query
     *         default: false
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/vehicle/search', function (req, res) {        
        let fuzzy = req.query.fuzzy;
        let option = fuzzy === 'true' ? {$or:[{plate: {$regex:req.query.keyword}},{number: {$regex:req.query.keyword}}]} : {$or:[{plate: req.query.keyword},{number: req.query.keyword}]}        
        vehicle.find(option)
            .populate("account", "name")
            .populate("vehicle_type", "name")
            .populate("vehicle_brand", "name")
            .populate("vehicle_color", "name")
            .populate("group", "name")
            .populate('device')
            .exec((err, vehicleAll) => {
                if (err) {
                    res.json(reponseHelper.Error('failed.Please try again later!'));
                    return;
                }
                if (vehicleAll) {
                    res.json(reponseHelper.Success(vehicleAll));
                }
            });
    });

    /**
     * @swagger
     * /api/vehicle/list:
     *   post:
     *    tags:
     *    - vehicle  
     *    summary: "车辆列表获取"
     *    produces:
     *    - application/json
     *    parameters:
     *    - name: status
     *      in: query
     *      description: "车辆状态0-全部，1-在线，2-离线"
     *      required: true
     *      type: integer
     *    responses:
     *      200:
     *          description: Successfully   
     */
    app.post('/vehicle/list', function (req, res) {
        let status = req.query ? req.query.status : 0;
        let option = status == 1 ? {status:consts.STATUS.ACTIVE} : status == 2 ? {status:consts.STATUS.INACTIVE} : {$or:[{status:consts.STATUS.ACTIVE},{status:consts.STATUS.INACTIVE}]}
        vehicle.find(option)
            .populate("account", "name")
            .populate("vehicle_type", "name")
            .populate("vehicle_brand", "name")
            .populate("vehicle_color", "name")
            .populate("group", "name")
            .populate('device')
            .exec((err, vehicleAll) => {
                // if (err) throw err;
                if (err) {
                    res.json(reponseHelper.Error('failed.Please try again later!'));
                    return;
                }
                if (vehicleAll) {                             
                    //对结果进行分组处理
                    let resultGroup = new Array();
                    //添加一个默认分组
                    resultGroup.push({name:'默认的分组',vehicles:[]});
                    vehicleAll.forEach(vehicle => {
                        // console.log(1);
                        if (vehicle.group) {
                            for (let index = 0; index < resultGroup.length; index++) {
                                const element = resultGroup[index];
                                if (vehicle.group.name == element.name) {
                                    element.vehicles.push(vehicle);
                                }else{
                                    if (index === resultGroup.length - 1){
                                        resultGroup.push({name: vehicle.group.name,vehicles:[vehicle]});
                                        break;
                                    }
                                }
                            } 
                        }else{
                            resultGroup[0].vehicles.push(vehicle);
                        }
                    });
                    res.json(reponseHelper.Success(resultGroup));
                }
            });
    });

    /**
     * @swagger
     * /api/vehicle/createVehicle:
     *   post: 
     *      tags:
     *          - vehicle
     *      produces:
     *      - application/json
     *      summary: "创建车辆"
     *      parameters:
     *      - name: vehicle
     *        in: body
     *        description: "车辆信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/vehicle'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/vehicle/createVehicle', function (req, res) {
        var myData = new vehicle(req.body);
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
     * /api/vehicle/createVehicleType:
     *   post: 
     *      tags:
     *          - vehicle
     *      produces:
     *      - application/json
     *      summary: "创建车辆类型"
     *      parameters:
     *      - name: vehicleType
     *        in: body
     *        description: "车辆类型信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/vehicle_type'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/vehicle/createVehicleType', function (req, res) {
        var myData = new vehicleType(req.body);
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
     * /api/vehicle/createVehicleBrand:
     *   post: 
     *      tags:
     *          - vehicle
     *      produces:
     *      - application/json
     *      summary: "创建车辆品牌"
     *      parameters:
     *      - name: vehicleBrand
     *        in: body
     *        description: "车辆品牌信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/vehicle_brand'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/vehicle/createVehicleBrand', function (req, res) {
        var myData = new vehicleBrand(req.body);
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
     * /api/vehicle/createVehicleColor:
     *   post: 
     *      tags:
     *          - vehicle
     *      produces:
     *      - application/json
     *      summary: "创建车辆颜色"
     *      parameters:
     *      - name: vehicleColor
     *        in: body
     *        description: "车辆颜色信息"
     *        required: true
     *        schema:
     *          $ref: '#/definitions/vehicle_color'
     *      responses:
     *          200:
     *              description: Successfully     
     */
    app.post('/vehicle/createVehicleColor', function (req, res) {
        var myData = new vehicleColor(req.body);
        myData.save()
            .then(item => {
                res.json(reponseHelper.Success('添加成功'))
            })
            .catch(err => {
                res.json(reponseHelper.Error('添加失败' + err))
            });
    });
}