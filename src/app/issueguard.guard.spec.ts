import { TestBed, async, inject } from '@angular/core/testing';

import { IssueguardGuard } from './issueguard.guard';

describe('IssueguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueguardGuard]
    });
  });

  it('should ...', inject([IssueguardGuard], (guard: IssueguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
