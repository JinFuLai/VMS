const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//理赔记录
const claims_settlementSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    liability_number: String,
    policy_no: String,
    insurance_company: { type: Schema.Types.ObjectId, ref: 'insurance_company' },
    amount: Number,
    report_date: Date,
    approval_status: { type: String, default: consts.APPROVAL_STATUS.PROCESSING },
    claim_status: { type: String, default: consts.CLAIM_STATUS.COMPLETE },
    response_by: { type: Schema.Types.ObjectId, ref: 'user' },
    repair_plant: { type: Schema.Types.ObjectId, ref: 'repair_plant' },
    bank_account: String,
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'claims_settlement' });

const Claims_settlementModel = mongoose.model('claims_settlement', claims_settlementSchema);
module.exports = Claims_settlementModel;