import { TestBed, inject } from '@angular/core/testing';

import { TabCommandProviderService } from './tab-command-provider.service';

describe('TabCommandProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabCommandProviderService]
    });
  });

  it('should be created', inject([TabCommandProviderService], (service: TabCommandProviderService) => {
    expect(service).toBeTruthy();
  }));
});
