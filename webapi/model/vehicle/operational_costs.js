const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//运行费用
const operational_costsSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    fee_type: { type: Schema.Types.ObjectId, ref: 'fee_type' },
    date: Date,
    amount: Number,
    charge_company: { type: Schema.Types.ObjectId, ref: 'charge_company' },
    response_by: { type: Schema.Types.ObjectId, ref: 'user' },
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'operational_costs' });

const Operational_costsModel = mongoose.model('operational_costs', operational_costsSchema);
module.exports = Operational_costsModel;