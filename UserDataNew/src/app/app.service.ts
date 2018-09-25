import { Injectable } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '../../node_modules/@angular/common/http';
import { Observable, throwError } from '../../node_modules/rxjs';
import { UserGroup } from './user-group';
import { catchError, map} from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginData } from './login-data';
import { Cookie } from 'ng2-cookies';
import { HttpFormEncodingCodec } from './http-form-encoding-codec';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _router: Router, private _http: HttpClient, private oauthService: OAuthService){
        this.oauthService.loginUrl = 'http://localhost:8080/oauth/token';
        this.oauthService.clientId = 'sampleClientId';
        this.oauthService.scope = 'read write';    
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});   
    }
  
  getAccessToken(loginData : LoginData){
      this.oauthService.clientId = loginData.username;
      this.oauthService.initImplicitFlow();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
 
  obtainAccessToken(loginData){

    //let myheaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //myheaders = myheaders.append('Authorization', 'Basic '+btoa('gigy:secret'));
    
    let body = new URLSearchParams();
    body.append('grant_type','password');
    body.append('username',loginData.username);
    body.append('password',loginData.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+btoa('sairaj:secret')
      })
    };

    let encoder: HttpFormEncodingCodec =  new HttpFormEncodingCodec();

    var params = {
      "grant_type":"password",
      "username":loginData.username,
      "password":loginData.password
    }

    const body1 = new HttpParams({ encoder: new HttpFormEncodingCodec() })
        .append('grant_type', 'password')
        .append('username', loginData.username)
        .append('password', loginData.password)
        .toString();

   
    //let myheaders = new HttpHeaders({'Authorization': 'Basic '+btoa('gigy:secret'),'Content-type': 'application/x-www-form-urlencoded'});
      
    this._http.post('http://localhost:8080/oauth/token', body1, httpOptions)
    .subscribe(
      data => this.saveToken(data,loginData.username),
      err => alert('Invalid Credentials')
    ); 
  }


  saveToken(token,userName){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token.access_token
      })
    };

    this._http.get('http://localhost:8080/users/'+userName, httpOptions)
    .subscribe(
      data => this.setAuthority(data),
      err => alert('Invalid Credentials')
    );
    this._router.navigate(['/home']);
  }

  setAuthority(user){
    Cookie.set('authority', user.userGroup.id);
    Cookie.set('user_id', user.id);
  }

  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);
    }
  } 

  logout() {
    Cookie.delete('access_token');
    Cookie.delete('authority');
    Cookie.delete('user_id');
    this._router.navigate(['/login']);
  }
}
