const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//围栏
const enclosureSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    name: String,
    wkt: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'enclosure' });

const EnclosureModel = mongoose.model('enclosure', enclosureSchema);
module.exports = EnclosureModel;