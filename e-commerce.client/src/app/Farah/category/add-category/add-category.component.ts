import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private _myser: FServiceService, private _route: Router) { }

  ngOnInit() {

  }


  addCategory(data: any) {
    this._myser.postCategory(data).subscribe(() => {
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'The category has been added successfully.',
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
        text: 'There was an issue adding the category.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
