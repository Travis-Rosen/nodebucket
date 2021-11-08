/*
Author: Travis Rosen
Name: create-task-dialog-component
Date: 11/7/2021
Description: dialog component logic
*/

//Imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }
  //Function for user to create new task
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }
  //Function to cancel dialog
  cancel() {
    this.dialogRef.close();
  }

}
