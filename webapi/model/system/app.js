const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema. This will contain all object we need for the client to create the app.
const appSchema = new Schema({
    name: String,
    domainName: String,
    logoUrl:String
}, { collection: 'app' });

// the schema is useless so far
// we need to create a model using it
const AppModel = mongoose.model('app', appSchema);
module.exports = AppModel;