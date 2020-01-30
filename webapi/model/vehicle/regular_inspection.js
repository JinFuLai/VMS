const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//安检情况
const regular_inspectionSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    inspecter: { type: Schema.Types.ObjectId, ref: 'user' },
    date: Date,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'regular_inspection' });

const Regular_inspectionModel = mongoose.model('regular_inspection', regular_inspectionSchema);
module.exports = Regular_inspectionModel;