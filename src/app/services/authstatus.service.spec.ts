import { TestBed, inject } from '@angular/core/testing';

import { AuthstatusService } from './authstatus.service';

describe('AuthstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthstatusService]
    });
  });

  it('should be created', inject([AuthstatusService], (service: AuthstatusService) => {
    expect(service).toBeTruthy();
  }));
});
