const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const consts = require("../Helper/consts");
const gpsPointSchema = require("./gpsPointSchema");

// create a schema. This will contain all object we need for the client to create the device.
//设备信息
const deviceSchema = new Schema({
    imei: { type: String, required: true, unique: true }, // device IMEI
    /**终端ID(设别编号) */
    device_id: String,
    /**设备类型 */
    device_type: { type: String, default: consts.DEVICETYPE.VEHICLE_GPS },
    manufactor: { type: Schema.Types.ObjectId, ref: 'manufactor' },
    simcard: { type: Schema.Types.ObjectId, ref: 'simcard' },
    produce_date: Date,
    purchase_date: Date,
    expire_date: Date,
    /**批次 */
    batch_number: String,
    /**国际编码 */
    international_code: String,
    account: { type: Schema.ObjectId, ref: 'account' },
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