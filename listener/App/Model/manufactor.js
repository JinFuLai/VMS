const mongoose = require('mongoose');
const consts = require("../Helper/consts");
const Schema = mongoose.Schema;

//设备生产厂家
const manufactorSchema = new Schema({
    name: String,
    /**编码 */
    code: String,
    // address: addressSchema,
    owner: String,
    // contact: contactSchema,
    bank_name: String,
    bank_account: String,
    tax_number: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'manufactor' });

const ManufactorModel = mongoose.model('manufactor', manufactorSchema);
module.exports = ManufactorModel;