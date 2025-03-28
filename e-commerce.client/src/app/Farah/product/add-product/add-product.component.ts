import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private _myser: FServiceService, private _route: Router) { }

  ngOnInit() {
    this.GetAllCategories()
  }

  //addProduct(data: any) {
  //  this._myser.postProduct(data).subscribe(() => {
  //    alert("Added Successfully")
  //    this._route.navigate([`/dashboard/product/${data.categoryID}`]);
  //  })
  //}

  addProduct(data: any) {
    this._myser.postProduct(data).subscribe(() => {
      // Show success message using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'The product has been added successfully.',
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
        text: 'There was an issue adding the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }


  categories: any
  GetAllCategories() {
    this._myser.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
}
