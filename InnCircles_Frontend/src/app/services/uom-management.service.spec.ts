import { TestBed } from '@angular/core/testing';

import { UomManagementService } from './uom-management.service';

describe('UomManagementService', () => {
  let service: UomManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
