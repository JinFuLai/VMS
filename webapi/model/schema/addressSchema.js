
const mongoose = require('mongoose');
const city = require("../address/city")

const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
const addressSchema = new Schema({
    city : {type: Schema.ObjectId, ref:'city'},
    street: String,
    zip_code: String
});

module.exports = addressSchema;