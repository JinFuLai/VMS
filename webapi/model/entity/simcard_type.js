// name String，
// 提供商 枚举（移动、联通、电信）
// 月租 double
// 缴费方式 枚举

// 缴费方式和充值方式只要一个，
const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//SIMCard类型
const simcard_typeSchema = new Schema({
    name: String,
    //TODO
    // provider: String,
    // monthly_rent: Number,
    // pay_type: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'simcard_type' });

const Simcard_typeModel = mongoose.model('simcard_type', simcard_typeSchema);
module.exports = Simcard_typeModel;

