import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from '../CartPaymentServices/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css']
})
export class EditVoucherComponent implements OnInit {
  voucher: any = {};
  states = ['Availabel', 'not Availabel'];

  constructor(private route: ActivatedRoute, private _ser: VoucherService, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this._ser.getVoucherById(id).subscribe((data) => {
      this.voucher = data;
    });
  }

  //updateVoucher() {
  //  this._ser.updateVoucher(this.voucher.id, this.voucher).subscribe(() => {
  //    alert("Updated Successfilly")
  //    this.router.navigate(['/dashboard/voucher']);
  //  });
  //}

  updateVoucher() {
    this._ser.updateVoucher(this.voucher.id, this.voucher).subscribe(() => {
      Swal.fire({
        title: "Success!",
        text: "Voucher updated successfully.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        this.router.navigate(['/dashboard/voucher']);
      });
    });
  }
}
