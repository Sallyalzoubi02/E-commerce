import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private _ser: MyServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  user: any;
  enableEdit: boolean = false;
  data: any;
  orders: any;
  items: any[] = [];
  addressForm!: FormGroup;

  vouchers:any

  changePasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = ''

  ngOnInit() {
    this._ser.currentlogged.subscribe((id)=> this.data = id)
    this._ser.getUserByID(this.data).subscribe((u) => {
      this.user = u;
      this.initAddressForm();
    });

    this._ser.getOrdes().subscribe((orders: any[]) => {
      this.orders = orders.filter((order: { userid: string }) => order.userid === this.data);
    });

    this._ser.getvoucher().subscribe((v) => {
      this.vouchers = v.filter((voucher: { userId: any }) => voucher.userId == 0 || voucher.userId == this.data)
    })
  }

  initAddressForm() {
    this.addressForm = this.fb.group({
      name: [this.user?.name || ''],
      email: [this.user?.email || ''],
      phone: [this.user?.phone || ''],
      payment: [this.user?.payment || ''],
      image: [this.user?.image || ''],
      address: [this.user?.address || '']
    });
  }

  openAddressModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  saveAddress() {
    const updatedData = {
      ...this.user,
      ...this.addressForm.value
    };

    this._ser.editUser(this.user.id, updatedData).subscribe(() => {
      this.user = updatedData;
      sessionStorage.setItem('UserID', this.user.id);
    });
  }


  openModal(orderid: any) {
    this._ser.getOrederItems().subscribe((items: any) => {
      this.items = items.filter((item: { order_id: string }) => item.order_id == orderid);
    });
  }

  activeModel() {
    this.enableEdit = true;
  }

  logout() {
    this._ser.logout();
  }

  UpdateProfile(data: any) {
    this.user = data;
    this._ser.editUser(this.user.id, this.user).subscribe(() => { })
    sessionStorage.setItem('UserID', this.user.id)
    this.enableEdit = false;
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.errorMessage = "Please fill all fields correctly.";
      this.successMessage = ''; // Clear success message
      return;
    }

    const { currentPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;

    // تحقق من أن كلمة المرور القديمة صحيحة
    if (this.user.password !== currentPassword) {
      this.errorMessage = "Current password is incorrect.";
      this.successMessage = ''; // Clear success message
      return;
    }

    if (newPassword !== confirmNewPassword) {
      this.errorMessage = "New passwords do not match.";
      this.successMessage = ''; // Clear success message
      return;
    }

    

    // تحديث بيانات المستخدم مع كلمة المرور الجديدة
    const updatedUser = {
      ...this.user,
      password: newPassword,  // تحديث كلمة المرور
    };

    this._ser.editUser(this.user.id, updatedUser).subscribe({
      next: () => {
        this.successMessage = "Password updated successfully!";
        this.errorMessage = '';
        this.changePasswordForm.reset();
        this.user.password = newPassword;  // تحديث كلمة المرور في الواجهة
      },
      error: (error) => {
        this.errorMessage = "Failed to update password. Please try again.";
        this.successMessage = '';
        console.error('Error updating password:', error);
      }
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      // استبدل `YOUR_API_KEY` بمفتاح API الخاص بك
      const uploadUrl = `https://api.imgbb.com/1/upload?key=91efc811ffbbb4d425bbc5160541b07e`;

      fetch(uploadUrl, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.data && data.data.url) {
            this.addressForm.patchValue({ image: data.data.url }); // تحديث النموذج بالرابط
          }
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  }


}
