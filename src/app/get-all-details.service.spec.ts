import { TestBed } from '@angular/core/testing';

import { GetAllDetailsService } from './get-all-details.service';

describe('GetAllDetailsService', () => {
  let service: GetAllDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
