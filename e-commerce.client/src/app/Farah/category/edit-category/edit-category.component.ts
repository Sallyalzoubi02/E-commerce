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
}
