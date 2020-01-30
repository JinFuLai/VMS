const mongoose = require('mongoose');
const consts = require("../../consts");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//事故记录
const accidentSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    liability_number: String,
    compensation_amount: Number,
    driver: { type: Schema.Types.ObjectId, ref: 'driver' },
    accident_date: Date,
    adjuster: String,
    repair_plant: { type: Schema.Types.ObjectId, ref: 'repair_plant' },
    address: addressSchema,
    description: String,
    result: String,
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'accident' });

const AccidentModel = mongoose.model('accident', accidentSchema);
module.exports = AccidentModel;