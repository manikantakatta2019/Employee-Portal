import { CommonService } from './../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  allEmployeeData = [];

  params: any;
  constructor(private route: ActivatedRoute, public commonService: CommonService) {
  }


  ngOnInit(): void {
    this.getEmployeeByDeptCode();
  }
  getEmployeeByDeptCode() {
    this.allEmployeeData = [];
    this.commonService.getAllEmployee().subscribe(res => {
      this.route.params.subscribe(params => this.params = params);
      if (this.params.deptCode !== 'All') {
        res.empData.forEach(emp => {
          if (emp.deptCode === this.params.deptCode) {
            this.allEmployeeData.push(emp);
          }
        });
      } else {
        this.allEmployeeData = res.empData;
      }

    });

  }
}
