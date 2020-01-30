const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//保养记录
const maintainSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    maintain_type: { type: Schema.Types.ObjectId, ref: 'maintain_type' },
    repair_plant: { type: Schema.Types.ObjectId, ref: 'repair_plant' },
    cost: Number,
    maintain_date_mileage: String,
    current_mileage: String,
    response_by: { type: Schema.Types.ObjectId, ref: 'user' },
    date: Date,
    maintain_items: { type: Schema.Types.ObjectId, ref: 'maintain_items' },
    photos: [String],
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'maintain' });

const MaintainModel = mongoose.model('maintain', maintainSchema);
module.exports = MaintainModel;