const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//设备指令
const commandSchema = new Schema({
    name: String,
    default_content: String,
    editable: String
}, { collection: 'command' });

const commandModel = mongoose.model('command', commandSchema);
module.exports = commandModel;