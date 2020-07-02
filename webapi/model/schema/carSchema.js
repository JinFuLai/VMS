const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carSchema = new Schema({
    car_erialNumber: String,
    plate_number: String,
    car_brand: String,
    car_tyle: String,
});
module.exports = carSchema;