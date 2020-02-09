
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema. This will contain all object we need for the client to create the app.
const gpsPointSchema = new Schema({
    /**经度 */
    longitude: Number,
    /**维度 */
    latitude: Number,
    /**速度 */
    speed: Number,
    /**高度 */
    altitude: Number,
    alert:[{type: String}],
    /**方向 */
    direction: Number,
    /**时间 */
    datetime: Date,
    custom_data: { any: Object},
    /**位置信息*/
    address: String
});
module.exports = gpsPointSchema;