const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//运行费用--费用名称
const fee_typeSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'fee_type' });

const fee_typeModel = mongoose.model('fee_type', fee_typeSchema);
module.exports = fee_typeModel;