// grab the things we need
const mongoose = require('mongoose');
const consts = require("../../consts");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

//车辆消息
const carMessageSchema = new Schema({
  
}, { collection: 'carMessage' });

const carMessageModel = mongoose.model('carMessage', carMessageSchema);
module.exports = carMessageModel;