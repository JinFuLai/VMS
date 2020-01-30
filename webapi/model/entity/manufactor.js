const mongoose = require('mongoose');
const consts = require("../../consts");
const contactSchema = require("../schema/contactSchema");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//设备生产厂家
const manufactorSchema = new Schema({
    name: String,
    address: addressSchema,
    owner: String,
    contact: contactSchema,
    bank_name: String,
    bank_account: String,
    tax_number: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'manufactor' });

const ManufactorModel = mongoose.model('manufactor', manufactorSchema);
module.exports = ManufactorModel;