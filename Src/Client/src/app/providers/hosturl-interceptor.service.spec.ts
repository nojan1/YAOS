import { TestBed, inject } from '@angular/core/testing';

import { HosturlInterceptorService } from './hosturl-interceptor.service';

describe('HosturlInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HosturlInterceptorService]
    });
  });

  it('should be created', inject([HosturlInterceptorService], (service: HosturlInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
