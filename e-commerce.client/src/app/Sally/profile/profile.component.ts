import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private _ser: MyServiceService) { }
  user: any;
  enableEdit: boolean = false;
  data: any

  
  ngOnInit() {
    this.data = sessionStorage.getItem('UserID') || 1;
    this._ser.getUserByID(this.data).subscribe((u) =>
      this.user = u);
  }

  activeModel() {
    this.enableEdit = true;
  }

  UpdateProfile(data: any) {
    this.user = data;
    this._ser.editUser(this.user.id, this.user).subscribe(() => { })
    sessionStorage.setItem('UserID', this.user.id)
    this.enableEdit = false;
  }

}
