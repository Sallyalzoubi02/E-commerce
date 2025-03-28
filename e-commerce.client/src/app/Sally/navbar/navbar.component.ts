import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  cartItemsCount: number = 0;
  constructor(private _serv: MyServiceService) { }

  ngOnInit() {
    this._serv.currentlogged.subscribe(userID => {
      this.isLoggedIn = userID !== "-1";

      this._serv.getCartItemsCount().subscribe(count => {
        this.cartItemsCount = count;
      });
    });

    this._serv.currentUserRole.subscribe(role => {
      this.isAdmin = role === "admin";
    });
  }

  logout() {
    this._serv.logout();
  }
}
