import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';
import { MyServiceService } from '../../Sally/my-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})


export class PaymentComponent {

  userId: any;
  cartId: any;
  cartItems: any[] = [];


  Total: any[] = [];
  Totals: number = 0;


  discount: any = 0;
  voucher: any = 0;
  allVoucher: any;
  VoucherUserInput: any = "";
  TotalAfterDiscount: number = this.Totals;

  isVoucherInputDisabled: boolean = false;
  isCheckoutDisabled: boolean = false;


  selectedRegion: string = '';
  differentRegion: string = '';

  selectedShippingMethod: string = 'free';
  selectedPaymentMethod: string = 'creditCard';

  shippingCost: number = 0;



  firstNameError: boolean = false;
  lastNameError: boolean = false;
  regionError: boolean = false;
  address1Error: boolean = false;
  townError: boolean = false;
  phoneError: boolean = false;
  emailError: boolean = false;
  differentRegionError: boolean = false;
  differentAddress1Error: boolean = false;
  differentTownError: boolean = false;
  differentPhoneError: boolean = false;
  differentEmailError: boolean = false;

  constructor(private _ser: CartPaymentService, private _serv: MyServiceService, private _router: Router) { }


  ngOnInit() {

    this._serv.currentlogged.subscribe((id) => this.userId = id)
    this.getCartId();
    this.bill();
    this.calculateDiscount();



  }

  getCartId() {

    this._ser.getCartIdSer().subscribe((data) => {

      const cart = data.find((item: any) => item.userId == this.userId);

      if (cart) {
        this.cartId = cart.id;
        this.getProducts();
      } 
    });

  }

  getProducts() {

    //alert("from getProduct gun ")
    this._ser.getProducts().subscribe((data) => {
      //alert("from getProduct fun after ser ")

      this.cartItems = data.filter((item: any) => item.cartId == this.cartId);

      //alert("from getProduct fun after ser and cartItem ")

      //alert(this.cartItems[0].productPrice)

      this.Total = this.cartItems.map(item => {

        return Number(item.productPrice) * Number(item.quantity);

      });
      //alert("the total is " + this.Total)


      this.bill();

      //alert("the totals is " + this.Totals)


    });
  }
  getVoucher(VoucherUserInput: any) {


    if (VoucherUserInput != "") {
      this._ser.getVoucher().subscribe((data) => {
        this.allVoucher = data;
        this.allVoucher.forEach((item: any) => {

          if (item.name == VoucherUserInput) {
            this.voucher = Number(item.discount);
            this.isVoucherInputDisabled = true;
          }
          else {
            this.isVoucherInputDisabled = false;
          }

        });
        this.calculateDiscount();
      });
    }
  }


  bill() {

    this.Totals = this.Total.reduce((acc, val) => acc + val, 0);
    this.calculateDiscount();

  }




  calculateDiscount() {
    if (this.voucher && this.Totals) {
      this.discount = Number(this.voucher) * (Number(this.Totals) / 100);
      this.TotalAfterDiscount = this.Totals - this.discount + this.shippingCost;
    } else {
      this.discount = 0;
      this.TotalAfterDiscount = this.Totals + this.shippingCost;
    }
  }



  checkOut(dataForm: any) {


    dataForm.amount = this.TotalAfterDiscount;
    dataForm.userid = this.userId;



    this._ser.peymenta(dataForm).subscribe(() => {

      Swal.fire({
        title: 'Success!',
        text: 'Payment done successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    });

    this.createOrder(dataForm);


  }

deleteCartItems() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete all cart items?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'No, keep them'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartItems.forEach(item => {
        const itemId: number = item.id;

        this._ser.deleteCartItem(itemId).subscribe(() => {
          Swal.fire('Deleted!', `Cart item with ID ${itemId} has been removed.`, 'success');
        });

      });

      // إعادة التوجيه بعد حذف جميع العناصر
      this._router.navigate(['/home']);
    }
  });
}

  async createOrder(data: any) {
  const now: Date = new Date();
  data.date = now;

  try {
    await this._ser.createOrder(data).toPromise();
    await this.generateOrderId();

    for (let i = 0; i < this.cartItems.length; i++) {
      await this.generateOrderItemId();

      let neworderItem: OrderItem = {
        product_id: this.cartItems[i].productId,
        product_name: this.cartItems[i].productName,
        product_price: this.cartItems[i].productPrice,
        product_quantity: this.cartItems[i].quantity,
        order_id: this.orderId,
      };

      this.createOrderItem(neworderItem);
    }

    Swal.fire({
      title: 'Success!',
      text: 'oreder done successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } catch (error) {
    console.error("Error creating order:", error);

    Swal.fire({
      title: 'Error!',
      text: 'Failed to create order.',
      icon: 'error',
      confirmButtonText: 'OK'
    });

  }
}
  orderId: any;
  orderItemId: any

  async generateOrderItemId() {
    try {
      const orders: any[] | undefined = await this._ser.getLastOrderItemId().toPromise();

      if (orders && orders.length > 0) {
        const lastId = Number(orders[orders.length - 1].id);

        if (!Number.isNaN(lastId)) {
          this.orderItemId = lastId + 1;
        } else {
          console.error("Invalid id in orders:", orders[orders.length - 1].id);
          this.orderItemId = 1; 
        }
      } else {
        console.error("No orders found to generate orderItemId.");
        this.orderItemId = 1; 
      }
    } catch (error) {
      console.error("Error fetching last orderItemId:", error);
      this.orderItemId = 1; 
    }

    this.deleteCartItems();

  }

  async generateOrderId() {
    try {
      const orders: any[] | undefined = await this._ser.getLastOrderId().toPromise();

      if (orders && orders.length > 0) {
        this.orderId = orders[orders.length - 1].id;
      } else {
        this.orderId = 1; 
      }
    } catch (error) {
      console.error("Error fetching last orderId:", error);
      this.orderId = 1; 
    }
  }
  createOrderItem(data: any) {

      this._ser.CreateOrderItem(data).subscribe(() => {

    });
  }


  validateForm(dataForm: any) {


    

    if (this.selectedShippingMethod == 'free') {
      this.shippingCost = 0;
    }
    else if (this.selectedShippingMethod == 'urgent') {
      this.shippingCost = 35;

    }



    this.firstNameError = !dataForm.firstName;
    this.lastNameError = !dataForm.lastName;
    this.regionError = !dataForm.region;
    this.address1Error = !dataForm.address1;
    this.townError = !dataForm.town;
    this.phoneError = !dataForm.phone;
    this.emailError = !dataForm.email;

    if (dataForm.diffrentShip) {

      this.differentRegionError = !dataForm.differentRegion;
      this.differentAddress1Error = !dataForm.differentAddress1;
      this.differentTownError = !dataForm.differentTown;
      this.differentPhoneError = !dataForm.differentPhone;
      this.differentEmailError = !dataForm.differentEmail;

      this.isCheckoutDisabled = this.firstNameError || this.lastNameError || this.regionError || this.address1Error || this.townError || this.phoneError || this.emailError || this.differentRegionError || this.differentAddress1Error || this.differentTownError || this.differentPhoneError || this.differentEmailError;
    } else {

      this.differentRegionError = false;
      this.differentAddress1Error = false;
      this.differentTownError = false;
      this.differentPhoneError = false;
      this.differentEmailError = false;

      this.isCheckoutDisabled = this.firstNameError || this.lastNameError || this.regionError || this.address1Error || this.townError || this.phoneError || this.emailError;
    }
  }


  onInputChange(dataForm: any) {

    this.validateForm(dataForm);

    if (this.selectedShippingMethod === 'free') {

      this.shippingCost = 0;
    } else if (this.selectedShippingMethod === 'urgent') {

      this.shippingCost = 35;

    }
    this.calculateDiscount();
  }

  

}
//interface Order {
//  userid: string;
//  amount: string;
//  date: Date;
//  id: any;

//}
interface OrderItem {
  product_id: number;
  product_name: string;
  product_price: number;
  order_id: number;
  product_quantity: number;
}
