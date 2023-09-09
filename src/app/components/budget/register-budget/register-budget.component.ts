import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BudgetInput } from 'src/app/models/budget/budgetInput';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'app-register-budget',
  templateUrl: './register-budget.component.html',
  styleUrls: ['./register-budget.component.css']
})
export class RegisterBudgetComponent implements OnInit {

  formRegister: FormGroup;
  showErrorMessages: boolean = false;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder, private route: Router, private budgetService: BudgetService) {
    this.formRegister = this.formBuilder.group({
      yearMonth: ['', [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\\/\\d{4}$")]],
      plannedBudget: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.errorMessages = [];

    const token = localStorage.getItem('token') as String;
    const inputData = this.formRegister.get('yearMonth')?.value;
    const parts = inputData.split('/');
    const year = parts[1];
    const month = parts[0];
    const formattedDate = `${year}-${month}`;

    let registerInput = this.formRegister.getRawValue() as BudgetInput;
    registerInput.yearMonth = formattedDate;
    this.budgetService.register(token, registerInput).subscribe({
      next: (data) =>{
        const navigationExtras: NavigationExtras = { state: { successData: `Orçamento cadastrado com sucesso!` } }
        this.route.navigate(['budgets'], navigationExtras)
      },
      error: (erro) =>{
        if (erro.error && erro.error.message) {
          this.errorMessages.push(erro.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    });
  }
}
