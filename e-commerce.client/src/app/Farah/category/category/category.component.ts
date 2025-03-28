import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private _myser: FServiceService) { }

  ngOnInit() {
    this.getDataCategory()
  }


  category: any
  getDataCategory() {
    this._myser.getCategory().subscribe((data) => {
      this.category = data
    })
  }



  DeletedCategory(id: any) {
    // Check if the category has any associated products
    this._myser.getProduct().subscribe((products: any) => {
      const productsInCategory = products.filter((product: any) => product.categoryID === id);

      if (productsInCategory.length > 0) {
        // Show an error message if there are products in the category
        Swal.fire({
          title: "Cannot Delete",
          text: "This category has products and cannot be deleted. You have to delete the product first",
          icon: "error",
          confirmButtonText: "OK"
        });
      } else {
        // Show a confirmation dialog for deletion
        Swal.fire({
          title: "Are you sure?",
          text: "This will delete the category and all related products!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel"
        }).then((result: any) => {
          if (result.isConfirmed) {
            this._myser.deleteCategory(id).subscribe(() => {
              Swal.fire("Deleted!", "The category has been deleted.", "success");
              this.getDataCategory(); // Update the category list
            });
          }
        });
      }
    });
  }
}
