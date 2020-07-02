const mongoose = require('mongoose');
const consts = require("../../consts");
const contactSchema = require("../schema/contactSchema");
const addressSchema = require("../schema/addressSchema");
const Schema = mongoose.Schema;

//用户信息  age phone file
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String},
  email: { type: String},
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
  status: { type: String, default: consts.STATUS.ACTIVE }, //界限
  number:{type:Number},
  phoneNumber:{type:Number},
  QQNumber:{type:Number},
  gender:{type:String},
  company:{type:String},
  department:{type:String},
  province:{type:String},
  city:{type:String},
  town:{type:String},
  street:{type:String},
  state:{type:String},
  role:{type:String},
}, { collection: 'user' });

//通过username查询用户
userSchema.static('findByUserName', function(username) {
  return this.find({ username });
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;