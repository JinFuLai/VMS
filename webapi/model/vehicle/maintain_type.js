const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//保养类型
const maintain_typeSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'maintain_type' });

const Maintain_typeModel = mongoose.model('maintain_type', maintain_typeSchema);
module.exports = Maintain_typeModel;