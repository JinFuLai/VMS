const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const userRoleSchema = new Schema({
  user:  {type: Schema.ObjectId, ref:'user'},
  role:  {type: Schema.ObjectId, ref:'role'}
}, { collection: 'userrole' });

// the schema is useless so far
// we need to create a model using it
const UserroleModel = mongoose.model('userrole', userRoleSchema);
module.exports = UserroleModel;