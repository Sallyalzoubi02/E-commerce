import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  constructor(private _myser: FServiceService, private _active: ActivatedRoute, private _route: Router) { }

  productData = { name: '', description: '', img: '', price: 0, rating: 0, discount: 0, categoryID: 0 }; // بيانات التصنيف


  dataProduct: any
  ngOnInit() {
    this.getCategoryId = this._active.snapshot.paramMap.get("categoryId")
    this.productId = this._active.snapshot.paramMap.get("id")
    this._myser.getProductById(this.productId).subscribe((data) => {
      this.dataProduct = data
    })

    this.GetAllCategories()
  }

  getCategoryId: any

  productId: any
  //editProduct(data: any) {
  //  let productId = this._active.snapshot.paramMap.get("id")
  //  this._myser.updateProduct(productId, data).subscribe(() => {
  //    alert("update successfully")
  //    this._route.navigate([`/dashboard/product/${data.categoryID}`]);
  //  })
  //}

  editProduct(data: any) {
    let productId = this._active.snapshot.paramMap.get("id");
    data.img = this.productData.img; // إضافة رابط الصورة إلى البيانات قبل الإرسال
    this._myser.updateProduct(productId, data).subscribe(() => {
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Updated!',
        text: 'The product has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the product page after success
        this._route.navigate([`/dashboard/product/${data.categoryID}`]);
      });
    }, (error) => {
      // Show error message using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }


  goToProducts() {
    this._route.navigate(['/dashboard/product', this.getCategoryId]);
    //this._route.navigate([`/product/${this.getCategoryId}`]);
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
