import { TestBed } from '@angular/core/testing';

import { ENVService } from './env.service';

describe('ENVService', () => {
  let service: ENVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ENVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
