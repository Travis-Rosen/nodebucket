/*
Author: Travis Rosen
Date: 11/7/2021
Title: employee.interface.ts
Description: Employee interface
*/

import { Item } from "./item.interface";

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
