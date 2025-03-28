import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service'; // تأكد من استيراد الخدمة بشكل صحيح
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  step: number = 1; // 1: Enter Email, 2: Enter OTP, 3: Set New Password
  user: any;
  constructor(private _serv: MyServiceService, private _route: Router) { }

  // إرسال البريد الإلكتروني للتحقق
  checkEmailExists() {
    this._serv.getUser().subscribe((data: any) => {
      this.user = data.find((x: any) => x.email == this.email);
      if (this.user) {
        this.step = 2; // انتقل إلى خطوة OTP
        this.sendOtpToEmail(); // إرسال OTP إلى البريد الإلكتروني
      } else {
        alert("البريد الإلكتروني غير موجود.");
      }
    }, error => {
      alert("حدث خطأ أثناء التحقق من البريد الإلكتروني.");
    });
  }

  // إرسال OTP إلى البريد الإلكتروني
  resetCode: any;
  sendOtpToEmail() {
     this.resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // رمز تحقق عشوائي مكون من 6 أرقام
    this._serv.sendEmail(this.email, this.resetCode, 'user-id').then(() => {
      alert("تم إرسال OTP إلى بريدك الإلكتروني.");
    }).catch(error => {
      alert("حدث خطأ أثناء إرسال OTP.");
    });
  }

  // التحقق من OTP المدخل
  verifyOtp() {
    if (this.otp === this.resetCode) { // تحقق وهمي من OTP
      this.step = 3; // الانتقال إلى خطوة تعيين كلمة المرور
    } else {
      alert("رمز OTP غير صحيح.");
    }
  }

  // تعيين كلمة المرور الجديدة
  resetPassword() {
    if (this.newPassword.length < 6) {
      alert("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
      return;
    }
    const updatedUser = {
      ...this.user,
      password: this.newPassword,  // تحديث كلمة المرور
    };
    this._serv.editUser(this.user.id, updatedUser).subscribe()
    alert("تم إعادة تعيين كلمة المرور بنجاح.");
    this._route.navigate(['/login']); // العودة إلى صفحة تسجيل الدخول
  }
}
