const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//保险公司
const insurance_companySchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'insurance_company' });

const Insurance_companyModel = mongoose.model('insurance_company', insurance_companySchema);
module.exports = Insurance_companyModel;