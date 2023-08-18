import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRedefinePasswordComponent } from './email-redefine-password.component';

describe('EmailRedefinePasswordComponent', () => {
  let component: EmailRedefinePasswordComponent;
  let fixture: ComponentFixture<EmailRedefinePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailRedefinePasswordComponent]
    });
    fixture = TestBed.createComponent(EmailRedefinePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
