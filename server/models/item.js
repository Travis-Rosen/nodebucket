/*
Author: Travis Rosen
Date: 11/02/2021
Title: item.js
Description: item schema
*/

//Require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Defining itemschema
let itemSchema = new Schema ({
  text: { type: String }
});
//Exporting schema
module.exports = itemSchema;
