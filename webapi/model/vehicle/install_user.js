const mongoose = require('mongoose');
const consts = require("../../consts");
const contactSchema = require("../schema/contactSchema");
const Schema = mongoose.Schema;

//安装人员
const install_userSchema = new Schema({
    name: String,
    contact: contactSchema,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE }
}, { collection: 'install_user' });

const Install_userModel = mongoose.model('install_user', install_userSchema);
module.exports = Install_userModel;