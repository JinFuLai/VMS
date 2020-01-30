const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require("../../consts");

// create a schema. This will contain all object we need for the client to create the group.
const groupSchema = new Schema({
    name: String,
    account: {type: Schema.ObjectId, ref:'account'},
    status: {type: String, default: consts.STATUS.ACTIVE},
}, { collection: 'group' });

// the schema is useless so far
// we need to create a model using it
const GroupModel = mongoose.model('group', groupSchema);
module.exports = GroupModel;