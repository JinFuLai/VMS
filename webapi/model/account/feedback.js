const mongoose = require('mongoose');
const consts = require("../../consts");
const Schema = mongoose.Schema;

//反馈内容
const feedbackSchema = new Schema({
    type: { type: Number, default: 0},//类型,目前默认为0
    content: { type: String, required: true},//反馈内容
    create_date: { type: Date, default: Date.now },//创建时间
    create_by: { type: Schema.Types.ObjectId, ref: 'user' },//创建者
}, { collection: 'feedback' });

const FeedbackModel = mongoose.model('feedback', feedbackSchema);
module.exports = FeedbackModel;