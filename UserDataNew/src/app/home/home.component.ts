import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '../../../node_modules/@angular/router';

import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,private _service:AppService){}

  ngOnInit(){
      if(parseInt(Cookie.get('authority'))==1){
        this._router.navigate(['/user-groups']);
      }
      else if(parseInt(Cookie.get('authority'))>1){
        this._router.navigate(['/user-details']);
      }
      this.reload();
  }

  reload(){
      window.location.reload();
  }

  logout() {
      this._service.logout();
  }

}
