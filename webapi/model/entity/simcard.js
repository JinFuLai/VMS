const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//SIMCard信息
const simcardSchema = new Schema({
    number: String,
    simcard_type: { type: Schema.Types.ObjectId, ref: 'simcard_type' },
    expire_date: Date,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'simcard' });

const SimcardModel = mongoose.model('simcard', simcardSchema);
module.exports = SimcardModel;