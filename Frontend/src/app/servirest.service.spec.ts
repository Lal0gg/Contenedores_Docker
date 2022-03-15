import { TestBed } from '@angular/core/testing';

import { ServirestService } from './servirest.service';

describe('ServirestService', () => {
  let service: ServirestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServirestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
