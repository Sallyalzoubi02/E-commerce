import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _serv: MyServiceService, private _route: Router) { }

  registerUser(user: any) {
    if (!user.name || !user.password || !user.email || !user.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    // التحقق مما إذا كان البريد الإلكتروني موجودًا بالفعل
    this._serv.getUser().subscribe((data: any) => {
      let exists = data.find((x: any) => x.email == user.email);

      if (exists) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      // تعيين القيم الافتراضية إذا لم يتم إدخالها
      user.address = user.address || "not determine";
      user.image = user.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
      user.payment = user.payment || "not determine";

      this._serv.registerUser(user).subscribe(() => {
        alert("User added successfully");
        this._route.navigate(['/login']);
      }, error => {
        alert("Error registering user: " + error.message);
      });
    }, error => {
      alert("Error checking email: " + error.message);
    });
  }
}
