import { TestBed } from '@angular/core/testing';

import { UsercredentialService } from './usercredential.service';

describe('UsercredentialService', () => {
  let service: UsercredentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercredentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
