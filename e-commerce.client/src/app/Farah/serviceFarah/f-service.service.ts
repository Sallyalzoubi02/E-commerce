import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FServiceService {

  constructor(private _http: HttpClient) { }


  // category

  getCategory() {
    return this._http.get(`https://67e2bee997fc65f535376bc7.mockapi.io/category`)
  }

  getCategoryById(id: any) {
    return this._http.get(`https://67e2bee997fc65f535376bc7.mockapi.io/category/${id}`)
  }

  postCategory(data: any) {
    return this._http.post(`https://67e2bee997fc65f535376bc7.mockapi.io/category` , data)
  }

  updateCategory(id: any, data: any) {
    return this._http.put(`https://67e2bee997fc65f535376bc7.mockapi.io/category/${id}`,data)
  }

  deleteCategory(id: any) {
    return this._http.delete(`https://67e2bee997fc65f535376bc7.mockapi.io/category/${id}`)
  }


  // product
  getProduct(): Observable<any> {
    return this._http.get<any>(`https://67d293bd90e0670699be292f.mockapi.io/product`)
  }

  getProductById(id: any)    {
    return this._http.get(`https://67d293bd90e0670699be292f.mockapi.io/product/${id}`)
  }


  postProduct(data: any) {
    return this._http.post(`https://67d293bd90e0670699be292f.mockapi.io/product`, data)
  }

  updateProduct(id: any, data: any) {
    return this._http.put(`https://67d293bd90e0670699be292f.mockapi.io/product/${id}`, data)
  }

  deleteProduct(id: any) {
    return this._http.delete(`https://67d293bd90e0670699be292f.mockapi.io/product/${id}`)
  }

  //users

  getUsers() {
    return this._http.get(`https://67e45d142ae442db76d42a1d.mockapi.io/user`)
  }

  postVoucherUser(data: any) {
    return this._http.post(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher`,data)
  }

  //Order
  getOrdes(): Observable<any> {
    return this._http.get(`https://67e2784597fc65f535363bfe.mockapi.io/Order`)
  }

  updateOrderStatus(order: any) {
    return this._http.put(`https://67e2784597fc65f535363bfe.mockapi.io/Order/${order.id}`, order);
  }
  // feedback

  getFeedback() {
    return this._http.get(`https://67e2bee997fc65f535376bc7.mockapi.io/contact`)
  }

}
