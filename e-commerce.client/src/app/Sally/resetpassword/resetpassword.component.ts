import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service'; // Make sure the service is imported correctly
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  resetCode: string = ''; // To store the generated OTP
  passwordError: string = ''; // To store password error messages

  constructor(private _serv: MyServiceService, private _route: Router) { }

  // Check if the email exists
  checkEmailExists() {
    this._serv.getUser().subscribe((data: any) => {
      this.user = data.find((x: any) => x.email === this.email);
      if (this.user) {
        this.step = 2; // Move to OTP step
        this.sendOtpToEmail(); // Send OTP to email
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Email not found',
          text: 'The email you entered is not registered in our system.'
        });
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while checking the email.'
      });
    });
  }

  // Generate and send OTP to the user's email
  sendOtpToEmail() {
    this.resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP
    this._serv.sendEmail(this.email, this.resetCode, 'user-id').then(() => {
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: 'OTP has been sent to your email.'
      });
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while sending the OTP.'
      });
    });
  }

  // Verify the OTP entered by the user
  verifyOtp() {
    if (this.otp === this.resetCode) { // Check if OTP matches the generated code
      this.step = 3; // Move to the new password step
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'The OTP you entered is incorrect.'
      });
    }
  }

  // Reset the password and update the user
  resetPassword() {
    // Validate password length
    if (this.newPassword.length < 6) {
      this.passwordError = "Password must be at least 6 characters long.";
      return;
    } else {
      this.passwordError = ''; // Clear the error if the password is valid
    }

    const updatedUser = {
      ...this.user,
      password: this.newPassword,  // Update the password
    };

    this._serv.editUser(this.user.id, updatedUser).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Your password has been successfully reset.'
      });
      this._route.navigate(['/login']); // Redirect to the login page
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error resetting the password.'
      });
    });
  }
}
