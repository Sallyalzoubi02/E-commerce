import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllVoucherComponent } from './get-all-voucher.component';

describe('GetAllVoucherComponent', () => {
  let component: GetAllVoucherComponent;
  let fixture: ComponentFixture<GetAllVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
