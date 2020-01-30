const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//年检记录
const annual_inspectionSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    number: String,
    cost: Number,
    insurance_typeSchema: { type: Schema.Types.ObjectId, ref: 'insurance_typeSchema' },
    date: Date,
    expire_date: Date,
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'annual_inspection' });

const Annual_inspectionModel = mongoose.model('annual_inspection', annual_inspectionSchema);
module.exports = Annual_inspectionModel;