import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ServService } from '../../Sondos/api/serv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _serv: ApiService, private sondosSer: ServService) { }

  ngOnInit() {
    this.getcat()
    this.getPro();
  }
  data: any
  getcat() {
    this._serv.getcat().subscribe((data) => {
      this.data = data
    })
  }
  products: any;
  getPro() {
    this.sondosSer.getProducts().subscribe((data) => {
      this.products = data
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


  getRatingArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

}
