const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//安全检查
const security_checkSchema = new Schema({
    name: String,
    order: Number,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'security_check' });

const Security_checkModel = mongoose.model('security_check', security_checkSchema);
module.exports = Security_checkModel;