import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  { path: '',  redirectTo: 'department', pathMatch: 'full' },
  { path: 'department', component: DepartmentComponent },
  { path: 'employee/:deptCode', component: EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
