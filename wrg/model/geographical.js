const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//地理位置
const geographicalSchema = new Schema({
    key: String,
    address: String,
}, { collection: 'geographical' });

const geographicalModel = mongoose.model('geographical', geographicalSchema);
module.exports = geographicalModel;