/*
Author: Travis Rosen
Date: 11/06/2021
Title: employee-routes.js
Description: js file for employee apis
*/

//Require Statements
const express = require('express');
const BaseResponse = require('../models/base-response');
const employee = require('../models/employee');
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

//updateTask
router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const updatedTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
        res.status(501).send(updatedTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });
        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);
            const updatedTaskOnSaveMongoErrorResponse = new BaseResponse('500', 'MongoDB Server Error', err);
            res.status(500).send(updatedTaskOnSaveMongoErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSuccessResponse = new BaseResponse('200', 'Successfully Updated Task', updatedEmployee);
            res.json(updatedTaskOnSuccessResponse.toObject());
          }
        })

      }
    })
  } catch (e) {
    console.log(e);
    const updateTaskCatchErrorResponse = new BaseResponse('500', 'Internal Server Error', e);
    res.status(500).send(updateTaskCatchErrorResponse.toObject());
  }
});

//deleteTask
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      if (err) {
      console.log(err);
      const deleteTaskMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
      res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);
        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemOnSuccessResponse = new BaseResponse('200', 'Successfully Removed ToDo Item', updatedTodoItemEmployee);
              res.json(deleteTodoItemOnSuccessResponse.toObject());
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'MongoDB Server Error', err);
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemOnSuccessResponse = new BaseResponse('200', 'Successfully Removed Done Item', updatedDoneItemEmployee);
              res.json(deleteDoneItemOnSuccessResponse.toObject());
            }
          })
        } else {
          console.log('Invalid Task Id: ' + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse('300', 'Invalid taskId', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const deleteTaskCatchErrorResponse = new BaseResponse('500', 'Internal Server Error', e);
    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
});

//End of APIs

//Export
module.exports = router;
