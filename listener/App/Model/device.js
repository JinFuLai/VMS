const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require("../Helper/consts");
const gpsPointSchema = require("./gpsPointSchema");

// create a schema. This will contain all object we need for the client to create the device.
//设备信息
const deviceSchema = new Schema({
    imei: { type: String, required: true, unique: true }, // device IMEI
    device_type: { type: String, default: consts.DEVICETYPE.VEHICLE_GPS },
    manufactor: { type: Schema.Types.ObjectId, ref: 'manufactor' },//设备生产厂家
    simcard: { type: Schema.Types.ObjectId, ref: 'simcard' },//SIMCard信息
    produce_date: Date,
    purchase_date: Date,
    expire_date: Date,
    batch_number: String,
    group: { type: Schema.ObjectId, ref: 'group' },//分组
    account: { type: Schema.ObjectId, ref: 'account' },//公司
    last_gps_point: gpsPointSchema,
    note: String,
    status: { type: String, default: consts.STATUS.ACTIVE },
}, { collection: 'device' });

//通过iemi查询设备
deviceSchema.static('findByIemi', function(iemi) {
    return this.find({ iemi });
});

// the schema is useless so far
// we need to create a model using it
const DeviceModel = mongoose.model('device', deviceSchema);
module.exports = DeviceModel;