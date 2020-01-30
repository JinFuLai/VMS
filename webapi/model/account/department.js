const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//部门
const departmentSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    name: String,
    user: { type: Schema.ObjectId, ref: 'user' },
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'department' });

const DepartmentModel = mongoose.model('department', departmentSchema);
module.exports = DepartmentModel;