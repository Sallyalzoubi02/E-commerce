import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private _myser: FServiceService, private _route: Router, private _active: ActivatedRoute) { }

  productData = { name: '', description: '', img: '', price:0, rating:0, discount:0, categoryID:0 }; // بيانات التصنيف

  ngOnInit() {
    this.categoryId = this._active.snapshot.paramMap.get("id")

    this.GetAllCategories()
  }

  //addProduct(data: any) {
  //  this._myser.postProduct(data).subscribe(() => {
  //    alert("Added Successfully")
  //    this._route.navigate([`/dashboard/product/${data.categoryID}`]);
  //  })
  //}
  categoryId: any
  addProduct(data: any) {

    data.img = this.productData.img; // إضافة رابط الصورة إلى البيانات قبل الإرسال
    this._myser.postProduct(data).subscribe(() => {
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'The product has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the product page after success
        this._route.navigate([`/dashboard/product/${this.categoryId}`]);
      });
    }, (error) => {
      // Show error message using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  goToProducts() {
    this._route.navigate(['/dashboard/product', this.categoryId]);
  }

  categories: any
  GetAllCategories() {
    this._myser.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const uploadUrl = "https://api.imgbb.com/1/upload?key=91efc811ffbbb4d425bbc5160541b07e";

      fetch(uploadUrl, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.data && data.data.url) {
            this.productData.img = data.data.url; // حفظ رابط الصورة
          }
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  }
}
