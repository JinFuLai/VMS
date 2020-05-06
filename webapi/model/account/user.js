const mongoose = require('mongoose');
const consts = require("../../consts");
const contactSchema = require("../schema/contactSchema");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//用户信息  age phone file
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String},
  nickname: String,
  token: String,
  contact: contactSchema,
  gender: String,
  account: { type: Schema.Types.ObjectId, ref: 'account' },
  department: { type: Schema.Types.ObjectId, ref: 'department' },
  address: addressSchema,
  photo: String,
  is_super_admin: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now },
  status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'user' });

//通过username查询用户
userSchema.static('findByUserName', function(username) {
  return this.find({ username });
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;