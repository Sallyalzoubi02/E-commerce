import { Component } from '@angular/core';
import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css'
})
export class VoucherComponent {
  selectedState: string = 'Availabel'; 
  constructor(private _ser: CartPaymentService) { }

  ngOnInit() {
  }

  addVoucher(dataForm: any) {
    dataForm.userId = 0;
    dataForm.states = this.selectedState; 
    this._ser.addVoucher(dataForm).subscribe(() => {
      alert("VoucherAdded .. .");
    });
  }
}
