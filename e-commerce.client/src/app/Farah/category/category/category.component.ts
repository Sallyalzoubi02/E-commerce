import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';

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
}
