import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import emailjs from 'emailjs-com';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private _url: HttpClient, private _route: Router) { }

  loggedID = new BehaviorSubject<string>(sessionStorage.getItem('UserID') || "-1");
  currentlogged = this.loggedID.asObservable();

  userRole = new BehaviorSubject<string>(sessionStorage.getItem('UserRole') || "user"); // افتراضيًا "user"
  currentUserRole = this.userRole.asObservable();

  // تحديث الـ UserID
  updateUserID(UserID: string, role: string) {
    sessionStorage.setItem('UserID', UserID);
    sessionStorage.setItem('UserRole', role);
    this.loggedID.next(UserID);
    this.userRole.next(role);
  }

  logout() {
    sessionStorage.removeItem('UserID');
    sessionStorage.removeItem('UserRole');
    this.loggedID.next("-1");
    this.userRole.next("user");
    this._route.navigate(['/home']).then(() => { window.location.reload(); })

  }

  getUserByID(id: number): Observable<any> {
    return this._url.get(`https://67e45d142ae442db76d42a1d.mockapi.io/user/${id}`)
  }

  getUser(): Observable<any> {
    return this._url.get(`https://67e45d142ae442db76d42a1d.mockapi.io/user`)
  }

  editUser(id: number, data: any): Observable<any> {
    return this._url.put(`https://67e45d142ae442db76d42a1d.mockapi.io/user/${id}`, data)
  }

  registerUser(data: any): Observable<any> {
    return this._url.post(`https://67e45d142ae442db76d42a1d.mockapi.io/user`, data)
  }

  getOrdes(): Observable<any> {
    return this._url.get(`https://67e2784597fc65f535363bfe.mockapi.io/Order`)
  }

  getOrederItems() {
    return this._url.get(`https://67e2784597fc65f535363bfe.mockapi.io/orde_items`)
  }

  changePassword(id: number, data: any): Observable<any> {
    return this._url.put(`$https://67e45d142ae442db76d42a1d.mockapi.io/user/${id}`, data);
  }

  addFeedback(data: any): Observable<any>{
    return this._url.post('https://67e2bee997fc65f535376bc7.mockapi.io/contact', data)
  }

  getvoucher(): Observable<any> {
    return this._url.get('https://67cea6ee125cd5af757b6514.mockapi.io/voucher')
  }
  getCartIdSer(): Observable<any> {
    return this._url.get('https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart');

  }
  editCartIdSer(id:any, data:any): Observable<any> {
    return this._url.put(`$https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart/${id}`,data);

  }
  sendEmail(email: string, resetCode: string, id: any) {
    return emailjs.send(
      'service_kwvtdxr',
      'template_0xh8hqu',
      {
        email: email,
        reset_code: resetCode,
        id: id
      },
      'ak8XwcvPwPsxFSSIU'
    );
  }

  updateCartCount(count: number) {
    this.cartItemsCount.next(count);
  }

  //---------------------------------cart count----------------------------------

  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();


  getCartItemsCount(): Observable<number> {
    return this.currentlogged.pipe(
      switchMap(userID => {
        

        // أولًا، نطلب الـ cartId بناءً على userID من الـ API الأول
        return this._url.get<any[]>(`https://67e2be6a97fc65f53537692b.mockapi.io/Artify/cart?userId=${userID}`).pipe(
          switchMap(cartItems => {
            if (cartItems.length === 0) {
              this.cartItemsCount.next(0);
              return of(0); // إذا لم تكن هناك عناصر تتوافق مع الـ userID
            }

            const cartId = cartItems[0].id; // نفترض أن هناك cartId في أول عنصر

            // ثانيًا، نطلب الـ cartItems باستخدام الـ cartId من الـ API الثاني
            return this._url.get<any[]>(`https://67d3448f8bca322cc269b2a9.mockapi.io/Carditem?cartId=${cartId}`).pipe(
              map(items => {
                // فلترة العناصر بحيث نأخذ فقط العناصر التي تحمل cartId المطلوب
                const itemCount = items.filter(item => item.cartId == cartId).length;
                this.cartItemsCount.next(itemCount); // تحديث العدد في الـ BehaviorSubject
                return itemCount; // إرجاع عدد العناصر التي تحمل cartId المطلوب
              }) // إرجاع عدد العناصر التي تحتوي على cartId معين
            );
          })
        );
      })
    );
  }
}
