import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoucherUserComponent } from './add-voucher-user.component';

describe('AddVoucherUserComponent', () => {
  let component: AddVoucherUserComponent;
  let fixture: ComponentFixture<AddVoucherUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVoucherUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVoucherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
