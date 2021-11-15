/*
Author: Travis Rosen
Date: 11/7/2021
Title: home.component.ts
Description: Logic for home component functions
*/

//Imports
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { TaskService } from '../../shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Defining variables
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    //Calling task service
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAllTasks--');
      console.log(res);
      //Binding to employee object
      this.employee = res;
      console.log('--Employee object--');
      console.log(this.employee);
      //Logging errors in console
    }, err => {
      console.log('--Server error--');
      console.log(err);
      //Binding todo and done to variables
    }, () => {
      console.log('Inside the complete function of the findAllTasks API.');
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('--Todo tasks--');
      console.log(this.todo);

      console.log('--Done Tasks--');
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  //Function to initiate create task dialog
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log('--Server Error--');
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(`Reordered the existing list of task items`);
      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(`Moved task item to the container`);
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  deleteTask(taskId: string) {
    if(confirm('Are you sure you want to delete this task?')) {
      if (taskId) {
        console.log(`Task Item: ${taskId} was removed`);
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    }
  }
}
