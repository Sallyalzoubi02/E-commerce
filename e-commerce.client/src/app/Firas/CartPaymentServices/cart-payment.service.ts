import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartPaymentService {


  constructor(private _http: HttpClient) { }



  getCartIdSer(): Observable<any> {
    return this._http.get('https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart');

  }

  getProducts(): Observable<any> {
    return this._http.get(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem`);
  }

  updatecartItem(id: number, data: any) {
    return this._http.put(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${id}`, data)
  }

  addVoucher(dataToAdd: any) {

    return this._http.post("https://67cea6ee125cd5af757b6514.mockapi.io/voucher", dataToAdd);
  }

  removeItem(cartItemId: any) {
    return this._http.delete(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${cartItemId}`);
  }

  getVoucher() {
    return this._http.get(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher`);

  }
  peymenta(data: any) {
    return this._http.post(`https://67e2be6a97fc65f53537692b.mockapi.io/Artify/payment`, data);
  }
  createOrder(data: any) {
    return this._http.post(`https://67e2784597fc65f535363bfe.mockapi.io/Order`, data);

  }
  getLastOrderId(): Observable<any[]> {
    return this._http.get<any>(`https://67e2784597fc65f535363bfe.mockapi.io/Order`);

  }

  CreateOrderItem(data: any) {
    return this._http.post(`https://67e2784597fc65f535363bfe.mockapi.io/orde_items`, data);
  }
  getLastOrderItemId(): Observable<any[]> {
    return this._http.get<any>(`https://67e2784597fc65f535363bfe.mockapi.io/orde_items`);

  }
  deleteCartItem(id: any) {

    return this._http.delete(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem/${id}`,);
  }
}
