const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//保险管理
const insuranceSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    insurance_company: { type: Schema.Types.ObjectId, ref: 'insurance_company' },
    insurance_type: { type: Schema.Types.ObjectId, ref: 'insurance_type' },
    amount: Number,
    effective_date: Date,
    expire_date: Date,
    update_date: Date,
    current_status: { type: String, default: consts.CURRENT_STATUS.VALIDATE },
    receipts: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'insurance' });

const InsuranceModel = mongoose.model('insurance', insuranceSchema);
module.exports = InsuranceModel;