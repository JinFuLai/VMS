const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const driverSchema = new Schema({
    name: String,
    phone: String,
    QQ: String,
    email: String,
});
module.exports = driverSchema;