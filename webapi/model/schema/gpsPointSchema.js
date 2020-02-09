
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
const gpsPointSchema = new Schema({
    longitude: Number,
    latitude: Number,
    speed: Number,
    altitude: Number,
    alert:[{type: String}],
    direction: Number,
    datetime: Date,
    custom_data: { any: Object},
    /**位置信息*/
    address: String
});
module.exports = gpsPointSchema;