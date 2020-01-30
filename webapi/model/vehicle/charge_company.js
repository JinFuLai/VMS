const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//运行费用--缴费类型
const charge_companySchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'charge_company' });

const charge_companyModel = mongoose.model('charge_company', charge_companySchema);
module.exports = charge_companyModel;