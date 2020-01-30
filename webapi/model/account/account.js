const mongoose = require('mongoose');
const addressSchema = require("../schema/addressSchema");
const contactSchema = require("../schema/contactSchema");
const consts = require("../../consts");
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
//公司
const accountSchema = new Schema({
    name: String,
    address: addressSchema,
    contact: contactSchema,
    owner: String,
    bank_name: String,
    bank_account: String,
    tax_number: String,
    application_name: String,
    default_language: { type: Schema.ObjectId, ref: 'language' },
    domain_name: String,
    css: String,
    logo: String,
    is_system: { type: Boolean, default: false },
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'account' });
// the schema is useless so far
// we need to create a model using it
const AccountModel = mongoose.model('account', accountSchema);
module.exports = AccountModel;