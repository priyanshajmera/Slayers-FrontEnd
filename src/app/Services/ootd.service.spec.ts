import { TestBed } from '@angular/core/testing';

import { OotdService } from './ootd.service';

describe('OotdService', () => {
  let service: OotdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OotdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
