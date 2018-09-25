import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { LoginData } from '../login-data';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData : LoginData = {username:"",password:""};
 
  constructor(private _router: Router,private _service:AppService) {
  }

  ngOnInit() {
    
  }

  login() {
    this._service.obtainAccessToken(this.loginData);
  }

}
