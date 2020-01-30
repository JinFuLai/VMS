const mongoose = require('mongoose');
const consts = require("../../consts");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//违章记录
const violationSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    violation_type: { type: Schema.Types.ObjectId, ref: 'violation_type' },
    address: addressSchema,
    date: Date,
    fines_amount: Number,
    fines_point: Number,
    driver: { type: Schema.Types.ObjectId, ref: 'driver' },
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'violation' });

const ViolationModel = mongoose.model('violation', violationSchema);
module.exports = ViolationModel;