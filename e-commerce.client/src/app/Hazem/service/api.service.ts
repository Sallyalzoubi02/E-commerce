import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _url: HttpClient) {

  }
  getcat() {
    return this._url.get('https://67e2bee997fc65f535376bc7.mockapi.io/category')
  }
  getproduct(): Observable<any[]> {
    return this._url.get<any[]>('https://67d293bd90e0670699be292f.mockapi.io/product');
  }


  

}
