const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  f_Name: { 
    type: String,
    required: true,
  },
  l_Name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true
  },
  accountType: {
    type: String,
    default: 'CUSTOMER'
  },
  status: {
    type: String,
    default: '1'
  },

},{ timestamps: true });



module.exports = mongoose.model("customer", CustomerSchema)
