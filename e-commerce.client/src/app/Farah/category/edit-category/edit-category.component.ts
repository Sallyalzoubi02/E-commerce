import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  constructor(private _myser: FServiceService, private _active: ActivatedRoute, private _route: Router) { }

  categoryData = { name: '', description: '', img: '' }; // بيانات التصنيف

  categoryId: any
  Category: any
  ngOnInit() {
    this.categoryId = this._active.snapshot.paramMap.get("id")
    this._myser.getCategoryById(this.categoryId).subscribe((data) => {
      this.Category = data
    })
  }


  //editCategory(data: any) {
  //  this.categoryId = this._active.snapshot.paramMap.get("id")

  //  this._myser.updateCategory(this.categoryId,data).subscribe(() => {
  //    alert("updated successfully")
  //    this._route.navigate(["/dashboard/category"])
  //  })
  //}

  editCategory(data: any) {
    this.categoryId = this._active.snapshot.paramMap.get("id");
    data.img = this.Category.img;
    this._myser.updateCategory(this.categoryId, data).subscribe(() => {
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Updated!',
        text: 'The category has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the category page after success
        this._route.navigate(["/dashboard/category"]);
      });
    }, (error) => {
      // Show error message using SweetAlert2 in case of an issue
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating the category.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
            this.Category.img = data.data.url;  // تحديث رابط الصورة في Category
          }
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  }

}
