import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  deptMockJson = environment.deptMock;
  empMockJson = environment.empMock;

  constructor(public httpclient: HttpClient) { }


  getAllDepartments(): Observable<any> {
      return this.httpclient.get(this.deptMockJson);
  }

  getAllEmployee(): Observable<any> {
    return this.httpclient.get(this.empMockJson);
}


}
