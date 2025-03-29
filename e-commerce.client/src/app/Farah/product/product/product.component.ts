import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(private _myser: FServiceService, private _active: ActivatedRoute) { }

  ngOnInit() {

    this.categoryID = this._active.snapshot.paramMap.get("id");
    this.getDataProduct()
  }


  categoryID: any
  Product: any

  getDataProduct() {
    this.categoryID = this._active.snapshot.paramMap.get("id");
    this._myser.getProduct().subscribe((data) => {
      this.Product = data.filter((p: any) => p.categoryID == this.categoryID)
        .map((p: any) => ({ ...p, showFull: false })); // إضافة متغير تحكم لكل منتج
    })
  }

  //DeletedProduct(id: any) {
  //  if (confirm("Are You Sure You Want To Delete This Product ?")) {
  //    this._myser.deleteProduct(id).subscribe(() => {
  //      alert("Deleted Successfully")

  //      this.getDataProduct()
  //    })
  //  }
  //}

  DeletedProduct(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this product.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._myser.deleteProduct(id).subscribe(() => {
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          this.getDataProduct(); // Refresh the product list
        }, (error) => {
          Swal.fire('Error!', 'There was an issue deleting the product.', 'error');
        });
      }
    });
  }

  toggleDescription(product: any) {
    product.showFull = !product.showFull;
  }
}
