import { Component, OnChanges } from '@angular/core';
import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';
import { Immediate } from 'rxjs/internal/util/Immediate';
import { MyServiceService } from '../../Sally/my-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {

  cartId: any;
  //userId = localStorage.getItem('userId');
  userId: any;

  cartItems: any[] = [];
  Total: number[] = [];
  quantity: number = 0;
  newQuantity: any;

  Totals: any = 0;

  discount: any = 0;
  voucher: any = 0;
  allVoucher: any;
  VoucherUserInput: any = "";
  TotalAfterDiscount: any = this.Totals;
  cartItemsCount: any;

  isVoucherInputDisabled: boolean = false;
  constructor(private _ser: CartPaymentService,
    private _serv: MyServiceService,
    private _router: Router) { }



  ngOnChanges() {
    this.getVoucher();
  }

  ngOnInit() {



    this._serv.currentlogged.subscribe((id) => this.userId = id)
    this.getCartId();
    this.bill();
    this._serv.getCartItemsCount().subscribe(count => {
      this.cartItemsCount = count;
    });
  }



  getCartId() {

    this._ser.getCartIdSer().subscribe((data) => {
      const cart = data.find((item: any) => item.userId == this.userId);

      if (cart) {
        this.cartId = cart.id;
        this.getProducts();
      } else {
        console.warn("No cart found for userId:", this.userId);
      }
    });


  }
  getProducts() {
    this._ser.getProducts().subscribe((data) => {
      this.cartItems = data.filter((item: any) => item.cartId == this.cartId);

      this.Total = this.cartItems.map(item => {

        return Number(item.productPrice) * Number(item.quantity);
      });

      console.log("Total array:", this.Total);
      this.bill();
    });
  }


  editQuantity(index: number, newQuantity: number) {
    if (newQuantity < 1) return;

    this.cartItems[index].quantity = newQuantity;

    this._ser.updatecartItem(this.cartItems[index].id, this.cartItems[index]).subscribe(() => {
      this.ngOnInit();

      this.calculateDiscount();
    });
  }

  bill() {
    this.Totals = this.Total.reduce((acc, val) => acc + val, 0);
    this.calculateDiscount();
  }


  removeItem(cartItemId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.removeItem(cartItemId).subscribe(() => {
          this.ngOnInit();
          this.getVoucher();
          Swal.fire('Deleted!', 'Your item has been removed.', 'success');
        });
      }
    });

    this._serv.updateCartCount(this.cartItemsCount - 1); 
    
  }

  getVoucher() {

    if (this.VoucherUserInput != "") {

      this._ser.getVoucher().subscribe((data) => {
        this.allVoucher = data;
        this.allVoucher.forEach((item: any) => {

          if (item.name == this.VoucherUserInput) {
            this.voucher = item.discount
            this.isVoucherInputDisabled = true;

          } else
            this.isVoucherInputDisabled = false;

        });
        this.calculateDiscount();

      });
    }
  }


  calculateDiscount() {
    if (this.voucher && this.Totals) {
      this.discount = Number(this.voucher) * (Number(this.Totals) / 100);
      this.TotalAfterDiscount = this.Totals - this.discount;
      //  localStorage.setItem("TotalAfterDiscount", this.TotalAfterDiscount.toString()); 
    } else {
      this.discount = 0;
      this.TotalAfterDiscount = this.Totals;
    }
  }



  goToPayment() {

    if (Number(this.userId) >= 1 && this.userId != null) {

      this._router.navigate(['/payment']);


    }
    else {
      Swal.fire({
        title: 'Please Login First',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem('payment','true')
          this._router.navigate(['/register']);
        }
      });
    }
  }



}
