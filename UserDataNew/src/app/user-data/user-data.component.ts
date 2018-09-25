import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../address';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Role } from '../role';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  users: Observable<User[]>;
  addUserForm: FormGroup;
  user:User = new User();
  submitted = false;
  editSubmitted = false;
  addrListSize: number = 0;
  enableAddUser = false;
  enableEditUser = false;
  address: Address = new Address();
  editUserObject: User;
  groupId: number;
  constructor(private userService: UserService, private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router,private _service:AppService) { }
 
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.groupId = params['groupId'] || 0;
      });
    this.reloadData();
  }
 
  reloadData() {
    this.users = this.userService.getUsersList(this.groupId);
  }

  enableAddUI() {
    this.enableAddUser = true;
  }

  disableAddUI() {
    this.enableAddUser = false;
    if(this.submitted = true){
      this.reloadData();
      this.submitted = false;
    }    
  }
  
  enableEditUI() {
    this.enableEditUser = true;
  }

  disableEditUI() {
    this.enableEditUser = false;
    this.reloadData();    
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
 
  save() {
    if(this.address.hno!=""&& this.address.hno!=null && this.address.area!="" && this.address.area!=null && this.address.pincode!="" && this.address.pincode!=null){
      this.user.addresses.push(this.address);
      if(this.user.role.name=='ROLE_ADMIN') {this.user.role.id=2;}
      else if(this.user.role.name=='ROLE_USER') {this.user.role.id=1;}
      this.userService.createUser(this.user, this.groupId)
        .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
      this.address = new Address();
    }    
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }

  addAddress() {
    if(this.address.hno!=""&& this.address.hno!=null && this.address.area!="" && this.address.area!=null && this.address.pincode!="" && this.address.pincode!=null){
      this.user.addresses.push(this.address);
      this.addrListSize = this.addrListSize+1;
      this.address = new Address();
    }
  }

  deleteAddress(index: number){
    this.user.deleteAddress(index);
    this.addrListSize = this.addrListSize-1;
  }

  editUser(user: User){
    this.editUserObject = user;
    this.enableEditUI();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id, this.groupId)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  deleteAll() {
    this.userService.deleteAll(this.groupId)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  logout() {
    this._service.logout();
  }

}
