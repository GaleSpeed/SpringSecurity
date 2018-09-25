import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Cookie } from '../../node_modules/ng2-cookies';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '../../node_modules/@angular/router';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private router: Router, private service:AppService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+Cookie.get('access_token')
    })
  };

  //const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});

  getUser(id: number, groupId:number): Observable<Object>{
    return this.http.get(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users/"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  createUser(user: User, groupId:number): Observable<any>{
   return this.http.post(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users",user, this.httpOptions)
   .pipe( catchError( err => this.errorHandler(err)));
  }

  deleteUser(id: number, groupId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users/"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  deleteAll(groupId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users", this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }
 
  getUsersList(groupId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users", this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  getUserById(id: number, groupId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users/"+`${id}`, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  updateUserById(id: number, user: User, groupId:number): Observable<any> {
    return this.http.put(`${this.baseUrl}`+"/user-groups/"+`${groupId}`+"/users/"+`${id}`, user, this.httpOptions)
    .pipe( catchError( err => this.errorHandler(err)));
  }

  errorHandler(err: HttpErrorResponse){
    alert('Something went wrong. Please Login again!');
    if (err.message.includes('Unknown') || err.message.includes('Invalid')) {
      this.service.logout();
      return EMPTY;
    } else {
        return throwError(err.message || 'Server Error');
    }
  }
}
