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
  userFound: any
  newUserCart:any

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
      let exists = data.find((x: any) => x.email === user.email);

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

      if (sessionStorage.getItem('payment') === 'true') {
        this._serv.registerUser(user).subscribe((registeredUser: any) => {
          // ✅ نحصل على ID المستخدم الجديد مباشرة من الرد
          const newUserId = registeredUser.id;
          console.log("✅ User Registered - ID:", newUserId);

          // ✅ البحث عن العربة الخاصة بالمستخدم الذي لم يتم تسجيله بعد
          this._serv.getCartIdSer().subscribe((carts: any) => {
            this.newUserCart = carts.find((c: any) => c.userId === "-1");

            if (this.newUserCart) {
              console.log("🛒 Cart Found Before Update:", this.newUserCart);

              // ✅ تحويل userId إلى رقم لتجنب الأخطاء
              this.newUserCart.userId = Number(newUserId);

              this._serv.editCartIdSer(this.newUserCart.id, this.newUserCart).subscribe(
                (updatedCart: any) => {
                  console.log("✅ Cart Updated Successfully:", updatedCart);

                  // ✅ بعد التحديث، نظهر رسالة النجاح ونوجه المستخدم للـ Login
                  Swal.fire({
                    title: 'Success!',
                    text: 'User added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    this._route.navigate(['/login']);
                  });
                },
                (error) => {
                  console.error("❌ Error updating cart:", error);
                  Swal.fire({
                    title: 'Error!',
                    text: 'Error updating cart: ' + error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                }
              );
            } else {
              console.warn("⚠️ No cart found with userId = -1");
            }
          });
        }, error => {
          console.error("❌ Error registering user:", error);
          Swal.fire({
            title: 'Error!',
            text: 'Error registering user: ' + error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });

        return;
      }

      


      // تسجيل المستخدم بشكل عادي إذا لم يكن قادمًا من صفحة الدفع
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
