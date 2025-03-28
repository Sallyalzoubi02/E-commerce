import { Component } from '@angular/core';
import { MyServiceService } from '../../Sally/my-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private _ser: MyServiceService) { }

  logout() {
    this._ser.logout();
  }
}
