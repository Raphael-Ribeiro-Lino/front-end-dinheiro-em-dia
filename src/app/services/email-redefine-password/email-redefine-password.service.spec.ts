import { TestBed } from '@angular/core/testing';

import { EmailRedefinePasswordService } from './email-redefine-password.service';

describe('EmailRedefinePasswordService', () => {
  let service: EmailRedefinePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRedefinePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
