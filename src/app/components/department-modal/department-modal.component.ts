import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.css']
})
export class DepartmentModalComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<DepartmentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      deptName: this.data ? this.data.deptName : '',
      deptCode: this.data ? this.data.deptCode : '',
      empCount: this.data ? this.data.empCount : 0,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.form.value);
  }
}
