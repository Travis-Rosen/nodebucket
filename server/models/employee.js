/*
Author: Travis Rosen
Date: 10/26/2021
Title: employee.js
Description: employee schema
*/

//Require statement for mongoose & defining schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Creating employee schema
let employeeSchema = new Schema({
  empId: { type: String, unique: true, dropDups: true },
  firstName: { type: String },
  lastName: { type: String }
}, { collection: 'employees'})
//Exporting employee schema
module.exports = mongoose.model('Employee', employeeSchema);
