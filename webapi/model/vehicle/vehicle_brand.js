const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//车辆品牌
const vehicle_brandSchema = new Schema({
    name: String,
    logo: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'vehicle_brand' });

const Vehicle_brandModel = mongoose.model('vehicle_brand', vehicle_brandSchema);
module.exports = Vehicle_brandModel;