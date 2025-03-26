import { TestBed } from '@angular/core/testing';

import { FServiceService } from './f-service.service';

describe('FServiceService', () => {
  let service: FServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
