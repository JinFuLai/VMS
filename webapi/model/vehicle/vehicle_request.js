const mongoose = require('mongoose');
const consts = require("../../consts");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//用车申请记录
const vehicle_requestSchema = new Schema({
    number: String,
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    applicant: { type: Schema.Types.ObjectId, ref: 'user' },
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    start_date: Date,
    end_date: Date,
    vehicle_mileage: String,
    destination: addressSchema,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'vehicle_request' });

const vehicle_requestModel = mongoose.model('vehicle_request', vehicle_requestSchema);
module.exports = vehicle_requestModel;