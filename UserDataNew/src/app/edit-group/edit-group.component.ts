import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

import { FormBuilder } from '@angular/forms';
import { UserGroup } from 'src/app/user-group';
import { UserGroupService } from 'src/app/user-group.service';
import { UserGroupComponent } from 'src/app/user-group/user-group.component';

@Component({
  selector: 'app-edit-user-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditUserGroupComponent implements OnInit {

  constructor(private userGroupService: UserGroupService, private formBuilder: FormBuilder, private userGroupComponent: UserGroupComponent) { }

  @Input() userGroup: UserGroup;
  @Input() groupId: number;
  editSubmitted = false;

  ngOnInit() {
  }

  onEditSubmit() {
    this.editSubmitted = true;
    this.userGroupService.updateUserGroupById(this.userGroup.id, this.userGroup)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  disableEditUI(){
    this.userGroupComponent.disableEditUI();
  }
}
