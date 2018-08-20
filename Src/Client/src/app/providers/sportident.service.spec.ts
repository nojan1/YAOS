import { TestBed, inject } from '@angular/core/testing';

import { SportidentService } from './sportident.service';

describe('SportidentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportidentService]
    });
  });

  it('should be created', inject([SportidentService], (service: SportidentService) => {
    expect(service).toBeTruthy();
  }));
});
