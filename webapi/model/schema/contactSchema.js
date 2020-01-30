
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
const contactSchema = new Schema({
    first_name: String,
    last_name: String,
    mobile: String,
    QQ: String,
    email: String
});
module.exports = contactSchema;