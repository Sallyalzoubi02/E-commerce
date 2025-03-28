import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _serv: ApiService) { }

  ngOnInit() {
    this.getcat()
  }
  data: any
  getcat() {
    this._serv.getcat().subscribe((data) => {
      this.data = data
    })
  }

  filteredProducts: any[] = [];

  filterProducts(Id:any) {
    this._serv.getproduct().subscribe((products: any[]) => {
      this.filteredProducts = products.filter(p => {
        debugger
        return this.data === 'All' || p.categoryId === Id;

      });
    });
  }


}
