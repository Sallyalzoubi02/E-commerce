import { Component, OnChanges } from '@angular/core';
import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';
import { Immediate } from 'rxjs/internal/util/Immediate';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {

  cartId: any;
  //userId = localStorage.getItem('userId');
  userId = 3;

  cartItems: any[] = [];
  Total: number[] = [];
  quantity: number = 0;
  newQuantity: any;

  Totals: any=0;

  discount: any=0;
  voucher: any=0;
  allVoucher: any;
  VoucherUserInput: any = "";
  TotalAfterDiscount: any = this.Totals;

  isVoucherInputDisabled: boolean = false;
  constructor(private _ser: CartPaymentService) { }

  ngOnChanges() {
    this.getVoucher();
  }

  ngOnInit() {

    this.getCartId();
    this.bill();
  }



  getCartId() {

    this._ser.getCartIdSer().subscribe((data) => {
      const cart = data.find((item: any) => item.userId == this.userId);

      if (cart) {
        this.cartId = cart.id;
        this.getProducts();
      } else {
        console.warn("No cart found for userId:", this.userId);
        alert("No cart found!");
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
    
    if (confirm("Are you sure you want to Delete This Item From Cart ?")) {
        this._ser.removeItem(cartItemId).subscribe(() => {
          this.ngOnInit();
          this.getVoucher();
        });
      } else {

      }
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
}
