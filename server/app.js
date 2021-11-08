/*
Author: Travis Rosen
Date: 10/26/2021
Title: app.js
Description: js file for api
*/

//Require statements
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const EmployeeAPI = require('./routes/employee-routes'); //Employee-routes from routes folder

//App configurations
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

//Server port
const port = 3000;

// database connection string
const conn = 'mongodb+srv://tmrosen:tmrosen@nodebucket.uq7sn.mongodb.net/nodebucket01?retryWrites=true&w=majority';

//Connecting to the database
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
});



app.use('/api/employees', EmployeeAPI);



//Creating the server
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
});
