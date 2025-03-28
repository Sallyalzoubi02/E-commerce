import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any[]>("https://67e2bee997fc65f535376bc7.mockapi.io/category");
  }

  getProducts() {
    return this.http.get<any[]>("https://67d293bd90e0670699be292f.mockapi.io/product");
  }

  getDiscounts() {
    return this.http.get<any[]>('https://67e2bee997fc65f535376bc7.mockapi.io/voature');
  }
  getUsers()  {
    return this.http.get<any[]>('https://67d6af03286fdac89bc2aab8.mockapi.io/userss');
  }
  getCart() {
    return this.http.get<any[]>('https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart');
  }
  createCart(userId: number) 
  {
    return this.http.post('https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart', {
      userId: userId
    });
  }
  addToCart(cartId: number, product: any): Observable<any> {
    let cartItem = {
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
      cartId: cartId
    };
    return this.http.post(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${cartId}`, cartItem);
  }


  
}
