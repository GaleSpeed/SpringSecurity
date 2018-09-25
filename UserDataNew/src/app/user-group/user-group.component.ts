import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGroupService } from '../user-group.service';
import { UserGroup } from '../user-group';
import { AppService } from '../app.service';
import { Cookie } from '../../../node_modules/ng2-cookies';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-userGroup-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  userGroups: Observable<UserGroup[]>;  
  submitted = false;
  addrListSize: number = 0;
  enableAddUser = false;
  groupId: number;
  userGroup: UserGroup = new UserGroup();
  enableEditUserGroup = false;
  editUserGroupObject: UserGroup;
  
  constructor(private userGroupService: UserGroupService,private _service:AppService,private _router:Router) { }

  ngOnInit() {
    if(parseInt(Cookie.get('authority'))<1){
      this._router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData(){
    this.userGroups = this.userGroupService.getUserGroupList();
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
    this.enableEditUserGroup = true;
  }

  editUserGroup(userGroup: UserGroup){
    this.editUserGroupObject = userGroup;
    this.enableEditUI();
  }

  disableEditUI() {
    this.enableEditUserGroup = false;
    this.reloadData();    
  }

  newUserGroup(): void {
    this.submitted = false;
    this.userGroup = new UserGroup();
  }
 
  save() {
    this.userGroupService.createUserGroup(this.userGroup)
        .subscribe(data => console.log(data), error => console.log(error));
      this.userGroup = new UserGroup();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }


  deleteUserGroup(id: number) {
    this.userGroupService.deleteUserGroup(id)
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
