const mongoose = require('mongoose');
const addressSchema = require("../schema/addressSchema");
const contactSchema = require("../schema/contactSchema");
const car = require("../schema/carSchema");
const driver = require("../schema/driverSchema");
const equipment = require("../schema/equipmentSchema");
const department = require("../schema/departmentSchema");
const consts = require("../../consts");
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
//公司
const accountSchema = new Schema({
    name: String,            //公司名称
    address: addressSchema,  //地址
    // contact: contactSchema,  //联系人
    contact: [{ type: String, ref: 'contactSchema' }],  //联系人
    car: [{ type: String, ref: 'carSchema' }], //车辆
    driver: [{ type: String, ref: 'driverSchema' }], //驾驶员
    equipment: [{ type: String, ref: 'equipmentSchema' }], //设备
    department: [{ type: String, ref: 'departmentSchema' }], //部门
    owner: String,           //物主
    bank_name: String,       //银行名称
    bank_account: String,    //银行账户
    tax_number: String,      //税号
    application_name: String,  //应用程序名称
    default_language: { type: Schema.ObjectId, ref: 'language' }, //默认语言
    domain_name: String,  //域名
    css: String,          //样式
    logo: String,         //logo
    is_system: { type: Boolean, default: false }, //在系统中
    note: String,        //注释
    status: { type: String, default: consts.STATUS.ACTIVE },//状态 界限
    company_type: { type: String }, //公司类别
    province: String, //省份
    city: String, //城市
    town: String, //乡镇
    street: String, //街道
    juridical_person: String, //法人
    comment: String, //备注
    car_number:String, //旗下车辆数
    driver_number:String, //旗下驾驶员数
    equipment_unmber:String, //旗下设备数

}, { collection: 'account' });
// the schema is useless so far
// we need to create a model using it
const AccountModel = mongoose.model('account', accountSchema);
module.exports = AccountModel;