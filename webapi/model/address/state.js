const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
//省
const stateSchema = new Schema({
    name: String,
    country: { type: Schema.ObjectId, ref: 'country' },
    is_active: Boolean,
    is_deleted: Boolean
}, { collection: 'state' });
// the schema is useless so far
// we need to create a model using it
const StateModel = mongoose.model('state', stateSchema);
module.exports = StateModel;