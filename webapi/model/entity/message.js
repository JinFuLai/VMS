const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//设备消息
const messageSchema = new Schema({
    command: { type: Schema.Types.ObjectId, ref: 'command' },
    device: { type: Schema.Types.ObjectId, ref: 'device' },
    content: String,
    create_date: Date,
    send_date: Date,
    create_by: { type: Schema.Types.ObjectId, ref: 'user' },
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'message' });

const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;