import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private _url: HttpClient) { }

  getUserByID(id: number): Observable<any> {
    return this._url.get(`https://67d6af03286fdac89bc2aab8.mockapi.io/userss/${id}`)
  }

  editUser(id: number, data: any): Observable<any> {
    return this._url.put(`https://67d6af03286fdac89bc2aab8.mockapi.io/userss/${id}`, data)
  }

  getOrdes(id: number): Observable<any> {
    return this._url.get(`https://67e2784597fc65f535363bfe.mockapi.io/Order/${id}`)
  }

  getOrederItems(id: number) {
    return this._url.get(`https://67e2784597fc65f535363bfe.mockapi.io/orde_items/${id}`)
  }

}
