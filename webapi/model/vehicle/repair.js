const mongoose = require('mongoose');
const consts = require("../../consts");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//维修记录
const repairSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    reasons: String,
    repair_plant: { type: Schema.Types.ObjectId, ref: 'repair_plant' },
    cost: Number,
    repair_type: { type: String, default: consts.REPAIR_TYPE.INSURE },
    date: Date,
    response_by: { type: Schema.Types.ObjectId, ref: 'user' },
    repair_status: { type: String, default: consts.REPAIR_STATUS.END },
    address: addressSchema,
    time: String,
    repair_items: [String],
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'repair' });

const RepairModel = mongoose.model('repair', repairSchema);
module.exports = RepairModel;