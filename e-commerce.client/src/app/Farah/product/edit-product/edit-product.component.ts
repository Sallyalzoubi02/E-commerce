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

  dataProduct: any
  ngOnInit() {
    let productId = this._active.snapshot.paramMap.get("id")
    this._myser.getProductById(productId).subscribe((data) => {
      this.dataProduct = data
    })

    this.GetAllCategories()
  }


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


  categories: any
  GetAllCategories() {
    this._myser.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

}
