const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//违章项目
const violation_typeSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'violation_type' });

const violation_typeModel = mongoose.model('violation_type', violation_typeSchema);
module.exports = violation_typeModel;