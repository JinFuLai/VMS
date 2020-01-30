const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//车辆颜色
const vehicle_colorSchema = new Schema({
    name: String,
    code: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'vehicle_color' });

const Vehicle_colorModel = mongoose.model('vehicle_color', vehicle_colorSchema);
module.exports = Vehicle_colorModel;