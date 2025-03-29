import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) {}

  getProductDetails(id: number) {
    return this._http.get(`https://67d293bd90e0670699be292f.mockapi.io/product/${id}`);
  }

  getComment() {
    return this._http.get("https://67d293bd90e0670699be292f.mockapi.io/comment");
  }

  getCommentsByProductId(id: number) {
    return this._http.get(`https://67d293bd90e0670699be292f.mockapi.io/comment?productID=${id}`);
  } 
  getCart() {
   return  this._http.get(`https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart`);
  }

  addComment(comment:any) {
    return this._http.post("https://67d293bd90e0670699be292f.mockapi.io/comment", comment);
  }



  //setUserId(userId: number) {
  //  this.userId$.next(userId);
  //}

  //getUserId() {
  //  return this.userId$.asObservable();
  //}

  getCartIdByUser(userId: number) {
    return this._http.get<any[]>(`https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart?userId=${userId}`);
  }

  getCartItem(cartId: number, productId: any) {
    return this._http.get<any[]>(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem?cartId=${cartId}&ProductId=${productId}`);
  }

  updateCartItemQuantity(cartItemId: number, newQuantity: number) {
    return this._http.put(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${cartItemId}`, { quantity: newQuantity });
  }


  addProductToCart(cartItem: any) {
    return this._http.post(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem`, cartItem);
  }


  createCart(userId: number) {
    return this._http.post('https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart', { userId });
  }


  getCartItemsByCartId(cartId: any) {
    return this._http.get<any[]>(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem?cartId=${cartId}`);
  }

  updateCartItem(itemId: number, updatedItem: any) {
    return this._http.put(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${itemId}`, updatedItem);
  }










}

function switchMap(arg0: (cartItem: any) => import("rxjs").Observable<Object>): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Function not implemented.');
}

function throwError(arg0: () => Error): import("rxjs").Observable<Object> {
    throw new Error('Function not implemented.');
}
