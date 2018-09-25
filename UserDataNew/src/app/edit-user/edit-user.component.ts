import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder } from '@angular/forms';
import { UserDataComponent } from '../user-data/user-data.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private userDataComponent: UserDataComponent) { }

  @Input() user: User;
  @Input() groupId: number;
  editSubmitted = false;

  ngOnInit() {
  }

  onEditSubmit() {
    this.editSubmitted = true;
    this.userService.updateUserById(this.user.id, this.user, this.groupId)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  disableEditUI(){
    this.userDataComponent.disableEditUI();
  }
}
