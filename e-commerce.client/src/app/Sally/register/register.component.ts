import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  imagePreview: string | null = null;

  constructor(private _serv: MyServiceService, private _route: Router) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const uploadUrl = `https://api.imgbb.com/1/upload?key=91efc811ffbbb4d425bbc5160541b07e`;

      fetch(uploadUrl, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.data && data.data.url) {
            this.imagePreview = data.data.url;
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to upload image. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while uploading the image.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }

  registerUser(user: any) {
    if (!user.name || !user.password || !user.email || !user.phone) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (user.password.length < 6) {
      Swal.fire({
        title: 'Error!',
        text: 'Password must be at least 6 characters.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this._serv.getUser().subscribe((data: any) => {
      let exists = data.find((x: any) => x.email == user.email);

      if (exists) {
        Swal.fire({
          title: 'Error!',
          text: 'Email already exists. Please use a different email.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      user.address = user.address || "Not specified";
      user.image = this.imagePreview || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
      user.payment = user.payment || "Not specified";

      this._serv.registerUser(user).subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this._route.navigate(['/login']);
        });
      }, error => {
        Swal.fire({
          title: 'Error!',
          text: 'Error registering user: ' + error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'Error checking email: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
