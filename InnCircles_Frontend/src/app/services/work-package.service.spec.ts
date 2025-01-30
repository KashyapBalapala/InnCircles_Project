import { TestBed } from '@angular/core/testing';

import { WorkPackageService } from './work-package.service';

describe('WorkPackageService', () => {
  let service: WorkPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
