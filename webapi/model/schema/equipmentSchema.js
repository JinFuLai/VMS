const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const equipmentSchema = new Schema({
    equipment_erialNumber: String,
    equipment_tyle: String,
    sim_card: String,
    production_date: String,
  
});
module.exports = equipmentSchema;