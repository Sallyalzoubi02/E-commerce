import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private _http: HttpClient) { }

  

  getAllVoucher() {
    return this._http.get(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher`);
  }

  deleteVoucher(id: number) {
    return this._http.delete(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher/${id}`);
  }
  getVoucherById(id: number) {
    return this._http.get(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher/${id}`);
  }

  updateVoucher(id: number, data: any) {
    return this._http.put(`https://67cea6ee125cd5af757b6514.mockapi.io/voucher/${id}`, data);
  }
  
}
