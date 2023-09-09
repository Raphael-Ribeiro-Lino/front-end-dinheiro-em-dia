import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBudgetComponent } from './register-budget.component';

describe('RegisterBudgetComponent', () => {
  let component: RegisterBudgetComponent;
  let fixture: ComponentFixture<RegisterBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBudgetComponent]
    });
    fixture = TestBed.createComponent(RegisterBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
