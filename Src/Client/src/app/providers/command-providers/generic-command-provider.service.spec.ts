import { TestBed, inject } from '@angular/core/testing';

import { GenericCommandProviderService } from './generic-command-provider.service';

describe('GenericCommandProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericCommandProviderService]
    });
  });

  it('should be created', inject([GenericCommandProviderService], (service: GenericCommandProviderService) => {
    expect(service).toBeTruthy();
  }));
});
