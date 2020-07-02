const mongoose = require('mongoose');
const consts = require("../../consts");
const car = require("../schema/carSchema");
const driver = require("../schema/driverSchema");
const equipment = require("../schema/equipmentSchema");
const Schema = mongoose.Schema;

//部门
const departmentSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    name: String, //部门名称
    user: { type: Schema.ObjectId, ref: 'user' },
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE } ,//界限
    belong_to_company:String, //所属公司
    department_principal:String,  //部门负责人
    comment:String, //备注
    car: [{ type: String, ref: 'carSchema' }], //车辆
    driver: [{ type: String, ref: 'driverSchema' }], //驾驶员
    equipment: [{ type: String, ref: 'equipmentSchema' }], //设备
}, { collection: 'department' });

const DepartmentModel = mongoose.model('department', departmentSchema);
module.exports = DepartmentModel;