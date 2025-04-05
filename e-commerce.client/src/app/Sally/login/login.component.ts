import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' }; // ✅ كائن لحفظ بيانات تسجيل الدخول
  cartid: any;
  cart: any;

  constructor(private _serv: MyServiceService, private _route: Router) { }

  LoginUser() {
    console.log(this.user);

    if (!this.user.email || !this.user.password) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // ✅ التحقق من بيانات الأدمن
    if (this.user.email === "admin@gmail.com" && this.user.password === 'admin') {
      Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this._serv.updateUserID('0', "admin");
        this._route.navigate(['/dashboard']);
      });
      return;
    }

    // ✅ التحقق من بيانات المستخدم العادي
    this._serv.getUser().subscribe((data: any) => {
      let userFound = data.find((x: any) => x.email === this.user.email && x.password === this.user.password);

      if (userFound) {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this._serv.updateUserID(userFound.id, "user");

          // ✅ تحديث الـ cartId في حالة وجود عربة غير مسجلة
          this._serv.getCartIdSer().subscribe((cartData) => {
            let cart = cartData.find((item: any) => Number(item.userId) === -1);

            if (cart) {
              cart.userId = userFound.id;
              this._serv.editCartIdSer(this.cartid, this.cart).subscribe();
            }
          });

          this._route.navigate(['/home']).then(() => {
            window.location.reload();
          });
        });

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid username or password',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
