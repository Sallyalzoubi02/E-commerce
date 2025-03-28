import { Component } from '@angular/core';
import { FServiceService } from '../../serviceFarah/f-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-voucher-user',
  templateUrl: './add-voucher-user.component.html',
  styleUrl: './add-voucher-user.component.css'
})
export class AddVoucherUserComponent {
  constructor(private _myser: FServiceService, private _active: ActivatedRoute, private _route: Router) { }


  selectedState: string = 'Available';


  ngOnInit() {
    this.userId = this._active.snapshot.paramMap.get("id")
  }

  userId:any
  addVoucherForUser(data: any) {
    this._myser.postVoucherUser(data).subscribe(
      (response) => {
        // Success alert with SweetAlert2
        Swal.fire({
          title: 'Voucher Added!',
          text: 'The voucher has been successfully added for the user.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the product page after success
          this._route.navigate([`/dashboard/users`]);
        });
      },
      (error) => {
        // Error alert with SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue adding the voucher. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
