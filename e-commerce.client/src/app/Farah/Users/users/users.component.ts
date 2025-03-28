import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private _myser: FServiceService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  users: any
  getAllUsers() {
    this._myser.getUsers().subscribe((data) => {
      this.users = data

    })
  }

}
