const mongoose = require('mongoose');
const consts = require("../../consts");
const contactSchema = require("../schema/contactSchema");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//维修厂管理
const repair_plantSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    name: String,
    address: addressSchema,
    owner: String,
    bank_name: String,
    bank_account: String,
    tax_number: String,
    contact: contactSchema,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'repair_plant' });

const Repair_plantModel = mongoose.model('repair_plant', repair_plantSchema);
module.exports = Repair_plantModel;