const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//保养项目
const maintain_itemsSchema = new Schema({
    name: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'maintain_items' });

const Maintain_itemsModel = mongoose.model('maintain_items', maintain_itemsSchema);
module.exports = Maintain_itemsModel;