const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
//国家
const countrySchema = new Schema({
    name: String,
    code: String,
    is_active: Boolean,
    is_deleted: Boolean
}, { collection: 'country' });
// the schema is useless so far
// we need to create a model using it
const CountryModel = mongoose.model('country', countrySchema);
module.exports = CountryModel;