const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//报废记录
const scrapSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    date: Date,
    used_cycle: String,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'scrap' });

const ScrapModel = mongoose.model('scrap', scrapSchema);
module.exports = ScrapModel;