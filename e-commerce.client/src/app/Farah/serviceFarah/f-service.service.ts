import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FServiceService {

  constructor(private _http: HttpClient) { }

  getCategory() {
    return this._http.get(`https://67e2bee997fc65f535376bc7.mockapi.io/category`)
  }
  
}
