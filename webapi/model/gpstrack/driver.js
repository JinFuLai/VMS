const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require("../../consts");
const addressSchema = require("../schema/addressSchema");
const contactSchema = require("../schema/contactSchema");

// create a schema. This will contain all object we need for the client to create the driver.
//驾驶员
const driverSchema = new Schema({
    number: String,
    name: String,
    birthday: Date,
    address: addressSchema,
    contact: contactSchema,
    account: { type: Schema.ObjectId, ref: 'account' },
    license: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE },
}, { collection: 'driver' });

// the schema is useless so far
// we need to create a model using it
const DriverModel = mongoose.model('driver', driverSchema);
module.exports = DriverModel;