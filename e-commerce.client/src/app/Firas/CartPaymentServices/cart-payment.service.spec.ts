import { TestBed } from '@angular/core/testing';

import { CartPaymentService } from './cart-payment.service';

describe('CartPaymentService', () => {
  let service: CartPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
