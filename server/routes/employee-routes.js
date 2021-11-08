/*
Author: Travis Rosen
Date: 11/06/2021
Title: employee-routes.js
Description: js file for employee apis
*/

//Require Statements
const express = require('express');
const Employee = require('../models/employee')
const router = express.Router();


//Start of APIs

//findEmployeeById
router.get('/:empId', async(req, res) =>{
  try {
    Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error.'
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error.'
    })
  }
})

//findAllTasks
router.get('/:empId/tasks', async(req, res) => {
  try{
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error.'
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })

  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error: ' + e.message);
  }
})

//createTask
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error: " + err.message,
        });
      } else {
        console.log(employee);

        const newItem = {
          text: req.body.text,
        };

        employee.todo.push(newItem);

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Internal server error: " + err.message,
            });
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

//End of APIs

//Export
module.exports = router;
