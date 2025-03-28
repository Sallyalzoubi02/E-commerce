import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { email: '', password: '' }; // ✅ كائن لحفظ بيانات تسجيل الدخول
  cartid: any;
  cart:any
  constructor(private _serv: MyServiceService, private _route: Router) { }
  LoginUser() {
    console.log(this.user)
    if (!this.user.email || !this.user.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (this.user.email == "admin@gmail.com", this.user.password == 'admin') {
      alert("Login successful");

      this._serv.updateUserID('0', "admin");
      this._route.navigate(['/dashboard']);
      return;
    }
    this._serv.getUser().subscribe((data: any) => {
      let userFound = data.find((x: any) => x.email == this.user.email && x.password == this.user.password);
      
      if (userFound) {
        alert("Login successful");

        this._serv.updateUserID(userFound.id, "user");
        

          this._serv.getCartIdSer().subscribe((data) => {
            let cart = data.find((item: any) => Number(item.userId) == -1);

            if (cart) {
              cart.userId = userFound.id
              this._serv.editCartIdSer(this.cartid, this.cart).subscribe()
             
            }
              
          });
          


        
        this._route.navigate(['/home']).then(() => { window.location.reload(); })
      } else {
        alert("Invalid username or password");
      }
    });
  }
}
