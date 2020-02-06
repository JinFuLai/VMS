const mongoose = require('mongoose');
const consts = require("../Helper/consts");
const Schema = mongoose.Schema;

//车辆信息
const vehicleSchema = new Schema({
    number: String,
    plate: String,
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    vehicle_type: { type: Schema.Types.ObjectId, ref: 'vehicle_type' },
    vehicle_brand: { type: Schema.Types.ObjectId, ref: 'vehicle_brand' },
    engine_number: String,
    frame_number: String,
    purchase_date: Date,
    vehicle_color: { type: Schema.Types.ObjectId, ref: 'vehicle_color' },
    tires: Number,
    length: Number,
    width: Number,
    hight: Number,
    onehundred_consumption: Number,
    device: { type: Schema.Types.ObjectId, ref: 'device' },
    install_date: Date,
    install_user: { type: Schema.Types.ObjectId, ref: 'install_user' },
    group: { type: Schema.ObjectId, ref: 'group' },
    safe_zone: { type: Schema.Types.ObjectId, ref: 'enclosure' },
    un_safe_zone: { type: Schema.Types.ObjectId, ref: 'enclosure' },
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE },
    maxspeed: Number,
    /**车牌颜色 */
    plate_color: String
}, { collection: 'vehicle' });

const VehicleModel = mongoose.model('vehicle', vehicleSchema);
module.exports = VehicleModel;