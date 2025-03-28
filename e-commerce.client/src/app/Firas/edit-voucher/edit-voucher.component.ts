import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from '../CartPaymentServices/voucher.service';

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

  updateVoucher() {
    this._ser.updateVoucher(this.voucher.id, this.voucher).subscribe(() => {
      this.router.navigate(['/dashboard/voucher']);
    });
  }
}
