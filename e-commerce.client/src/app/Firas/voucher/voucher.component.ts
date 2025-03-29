import { Component } from '@angular/core';
import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css'
})
export class VoucherComponent {
  selectedState: string = 'Availabel';
  constructor(private _ser: CartPaymentService, private router: Router) { }

  ngOnInit() {
  }

  //addVoucher(dataForm: any) {
  //  dataForm.userId = 0;
  //  dataForm.states = this.selectedState;
  //  this._ser.addVoucher(dataForm).subscribe(() => {
  //    alert("Voucher Added");
  //    this.router.navigate(['/dashboard/voucher']);
  //  });
  //}

  addVoucher(dataForm: any) {
    dataForm.userId = 0;
    dataForm.states = this.selectedState;

    this._ser.addVoucher(dataForm).subscribe(() => {
      Swal.fire({
        title: "Voucher Added!",
        text: "The voucher has been successfully added.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        this.router.navigate(['/dashboard/voucher']);
      });
    });
  }
}
