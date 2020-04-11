import { DepartmentModalComponent } from './../department-modal/department-modal.component';
import { Router } from '@angular/router';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentData = [];
  employeeData: any;
  addedDept: any;
  constructor(public commonService: CommonService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllEmpolyee();
    this.getAllDepartments();
  }
  getAllEmpolyee() {
    this.commonService.getAllEmployee().subscribe(res => {
      this.employeeData = res.empData;
    });
  }
  getAllDepartments() {
    this.commonService.getAllDepartments().subscribe(res => {
      this.departmentData = res.deptData;
      this.departmentData.forEach((dept, i) => {
        for (const emp in this.employeeData) {
          if (this.employeeData.hasOwnProperty(emp)) {
            if (this.departmentData[i].deptCode === this.employeeData[emp].deptCode) {
              this.departmentData[i].empCount += 1;
            }
          }
        }
      });

      console.log(this.departmentData);
    });
  }

  showEmp(dept) {
    this.router.navigate(['employee/', dept.deptCode]);

  }

  addDept(): void {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addedDept = result;
      console.log(this.addedDept);
      if (this.addedDept.deptName !== '' && this.addedDept.deptCode !== '') {
        this.departmentData.push(result);
        this.departmentData.forEach((dept, i) => {
          for (const emp in this.employeeData) {
            if (this.employeeData.hasOwnProperty(emp)) {
              if (this.departmentData[i].deptCode === this.employeeData[emp].deptCode) {
                this.departmentData[i].empCount += 1;
              }
            }
          }
        });
        
      }
    });
  }

  editDept(dept, i) {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      width: '250px',
      data: { deptName: dept?.deptName, deptCode: dept?.deptCode, empCount: dept?.empCount }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addedDept = result;
      console.log(this.addedDept);
      this.departmentData.splice(i, 1);
      this.departmentData.push(result);

    });
  }

  deleteDept(index) {
    this.departmentData.splice(index, 1);
  }

}