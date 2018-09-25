import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { UserGroup } from './user-group';
import { Cookie } from '../../node_modules/ng2-cookies';
import { Router } from '../../node_modules/@angular/router';
import { catchError } from '../../node_modules/rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  private baseUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+Cookie.get('access_token')
    })
  };
  
  constructor(private http: HttpClient, private router: Router, private service: AppService) { }

  getUserGroup(id: number): Observable<Object>{ 
    return this.http.get(`${this.baseUrl}`+"/user-groups/"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  createUserGroup(userGroup: UserGroup): Observable<any>{
   return this.http.post(`${this.baseUrl}`+"/user-groups",userGroup, this.httpOptions)
   .pipe( catchError( err => this.errorHandler(err)));
  }

  deleteUserGroup(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+"/user-groups/"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }
 
  getUserGroupList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+"/user-groups", this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  getUserGroupById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}`+"/user-groups"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  updateUserGroupById(id: number, userGroup: UserGroup): Observable<any> {
    return this.http.put(`${this.baseUrl}`+"/user-groups", userGroup, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  errorHandler(err: HttpErrorResponse){
    
    if (err.message.includes('Unknown') || err.message.includes('Invalid')) {
      alert('Something went wrong. Please Login again!');
      this.service.logout();
      return EMPTY;
    } else {
      alert('Something went wrong. Error: '+err.message);
      return throwError(err.message || 'Server Error');
    }
  }
}
