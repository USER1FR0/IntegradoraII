import { TestBed } from '@angular/core/testing';

import { FbLoginService } from './facebook.service';

describe('FbLoginService', () => {
  let service: FbLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
