import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { auth1Guard } from './auth1.guard';

describe('auth1Guard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auth1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
