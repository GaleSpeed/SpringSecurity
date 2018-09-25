import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Cookie } from '../../../node_modules/ng2-cookies';
import { Address } from '../address';
import { AppService } from '../app.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  enableEditUser = false;
  address: Address;
  editUserObject: User;
  groupId: number;
  editSubmitted = false;

  constructor(private _router:Router,private userService: UserService, private _service:AppService) { }

  ngOnInit() {
     this.userService.getUserById(parseInt(Cookie.get('user_id')),parseInt(Cookie.get('authority')))
    .subscribe(
      data => this.user = data,
      err => {alert('User session expired!'), this._router.navigate(['/login'])}
    );
  }

  reloadData() {
    this.userService.getUserById(parseInt(Cookie.get('user_id')),parseInt(Cookie.get('authority')))
    .subscribe(
      data => this.user = data
    );
  }

  enableEditUI() {
    this.enableEditUser = true;
  }

  onEditSubmit() {
    this.editSubmitted = true;
    this.userService.updateUserById(parseInt(Cookie.get('user_id')), this.user, parseInt(Cookie.get('authority')))
    .subscribe(data => console.log(data), error => console.log(error));
  }

  disableEditUI() {
    this.enableEditUser = false;
    this.reloadData();    
  }

  editUser(user: User){
    this.editUserObject = user;
    this.enableEditUI();
  }

  logout() {
    this._service.logout();
  }

}
