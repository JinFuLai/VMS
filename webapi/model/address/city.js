const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
//城市
const citySchema = new Schema({
    name : String,  
    state: {type: Schema.ObjectId, ref:'state'},
    is_active: Boolean,
    is_deleted: Boolean
}, { collection: 'city' });
// the schema is useless so far
// we need to create a model using it
const CityModel = mongoose.model('city', citySchema);
module.exports = CityModel;