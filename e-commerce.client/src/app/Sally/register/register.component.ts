import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

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
          }
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  }

  registerUser(user: any) {
    if (!user.name || !user.password || !user.email || !user.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    this._serv.getUser().subscribe((data: any) => {
      let exists = data.find((x: any) => x.email == user.email);

      if (exists) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      user.address = user.address || "Not specified";
      user.image = this.imagePreview || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
      user.payment = user.payment || "Not specified";

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
