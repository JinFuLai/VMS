const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//车管所
const insurance_typeSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'insurance_type' });

const Insurance_typeModel = mongoose.model('insurance_type', insurance_typeSchema);
module.exports = Insurance_typeModel;