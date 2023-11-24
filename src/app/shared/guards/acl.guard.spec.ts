import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aclGuard } from './acl.guard';

describe('aclGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aclGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
