import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent {
  constructor(private _router: Router) { }

  completePayment() {
    // العودة إلى مكون payment مع تمرير queryParams
    this._router.navigate(['/payment'], { queryParams: { paymentComplete: true } });
  }
}
