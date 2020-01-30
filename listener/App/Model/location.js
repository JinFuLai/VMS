const mongoose = require('mongoose');
const gpsPointSchema = require("./gpsPointSchema");
const Schema = mongoose.Schema;

// create a schema. This will contain all object we need for the client to create the location.
//位置数据
const locationSchema = new Schema({
    gps_point: gpsPointSchema,
    device: { type: Schema.ObjectId, ref: 'device' },
    vehicle: { type: Schema.ObjectId, ref: 'vehicle' },
    driver: { type: Schema.ObjectId, ref: 'driver' },
    group: { type: Schema.ObjectId, ref: 'group' },
}, { collection: 'location' });

// the schema is useless so far
// we need to create a model using it
const LocationModel = mongoose.model('location', locationSchema);
module.exports = LocationModel;