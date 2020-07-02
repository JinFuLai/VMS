const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//车辆信息
const vehicleSchema = new Schema({
    number: String, //车辆编号
    plate: String, //车牌
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    belong_to_company: String, //所属公司
    vehicle_type: { type: Schema.Types.ObjectId, ref: 'vehicle_type' },  //车辆类型
    vehicle_brand: { type: Schema.Types.ObjectId, ref: 'vehicle_brand' }, //汽车品牌
    engine_number: String, //发动机编号
    frame_number: String,  //车架号
    purchase_date: Date, //购买日期
    vehicle_color: { type: Schema.Types.ObjectId, ref: 'vehicle_color' }, //汽车颜色
    tires: Number,  //车辆轮胎数
    length: Number,  //车辆长
    width: Number,  //车辆宽
    hight: Number,  //车辆高
    onehundred_consumption: Number,  //百公里油耗
    device: { type: Schema.Types.ObjectId, ref: 'device' },
    SIM_card: String, //SIM卡号
    GPS_equipment: String, //GPS设备
    install_date: Date, //安装时间
    install_user: { type: Schema.Types.ObjectId, ref: 'install_user' }, //安装人员
    group: { type: Schema.ObjectId, ref: 'group' },
    safe_zone: { type: Schema.Types.ObjectId, ref: 'enclosure' }, //可行驶区域
    un_safe_zone: { type: Schema.Types.ObjectId, ref: 'enclosure' }, //不可行驶区域
    driver: { type: Schema.Types.ObjectId, ref: 'driver' },
    photos: [String],  //车辆照片
    note: String, //备注
    status: { type: String, default: consts.STATUS.ACTIVE },
    maxspeed: Number,
    /**车牌颜色 */
    plate_color: String
}, { collection: 'vehicle' });

const VehicleModel = mongoose.model('vehicle', vehicleSchema);
module.exports = VehicleModel;