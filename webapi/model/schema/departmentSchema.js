const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentSchema = new Schema({
    belong_to_company: String,
    department_name: String,
    principal: String,
    principal_phone: String,
});
module.exports = departmentSchema;