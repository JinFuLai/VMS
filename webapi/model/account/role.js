// grab the things we need
const mongoose = require('mongoose');
const consts = require("../../consts");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

//角色信息
const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  describe: String,
  account: { type: Schema.Types.ObjectId, ref: 'account' },
  permission: [{ type: String }],
  status: { type: String, default: consts.STATUS.ACTIVE }, //界限
  company: { type: String },
  jurisdiction: { type: String },
  accessNumber: { type: Number },
  userNumber: { type: Number },
}, { collection: 'role' });

// the schema is useless so far
// we need to create a model using it
const RoleModel = mongoose.model('role', roleSchema);
module.exports = RoleModel;