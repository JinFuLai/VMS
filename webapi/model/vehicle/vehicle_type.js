const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//车辆类型
const vehicle_typeSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'vehicle_type' });

const Vehicle_typeModel = mongoose.model('vehicle_type', vehicle_typeSchema);
module.exports = Vehicle_typeModel;