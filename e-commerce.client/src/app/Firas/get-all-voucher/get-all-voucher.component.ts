import { Component } from '@angular/core';
import { CartPaymentService } from '../CartPaymentServices/cart-payment.service';
import { throwIfEmpty } from 'rxjs';
import { VoucherService } from '../CartPaymentServices/voucher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-all-voucher',
  templateUrl: './get-all-voucher.component.html',
  styleUrl: './get-all-voucher.component.css'
})
export class GetAllVoucherComponent {

  constructor(private _ser: VoucherService, private _router: Router) { }

  ngOnInit() {
    this.getAllVoucher();

  }
  allVoucher: any;

  getAllVoucher() {
    this._ser.getAllVoucher().subscribe((data) => {
      this.allVoucher = data;

    });
  }


  deleteVoucher(id: number) {
    if (confirm('Are you sure you want to delete this voucher?')) {
      this._ser.deleteVoucher(id).subscribe(() => {
        this.getAllVoucher(); 
      });
    }
  }

  editVoucher(id: number) {
    this._router.navigate(['/dashboard/editVoucher', id]); 
  }
}
