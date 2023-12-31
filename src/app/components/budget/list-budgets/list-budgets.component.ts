import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetOutput } from 'src/app/models/budget/budgetOutput';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'app-list-budgets',
  templateUrl: './list-budgets.component.html',
  styleUrls: ['./list-budgets.component.css']
})
export class ListBudgetsComponent implements OnInit{
  
  budgets: BudgetOutput[] = [];

  messageWithoutRegisteredBudgets: string = '';
  successfullyRegisteredBudget: string = '';
  errorMessages: string[] = [];
  showErrorMessages: boolean = false;

  currentPage: number = 0;
  totalPages: number = 1;


  constructor(private budgetService:BudgetService, private route: Router){
    const currentNavigation = route.getCurrentNavigation();
    if (currentNavigation?.extras?.state?.['successData']) {
      this.successfullyRegisteredBudget = currentNavigation?.extras?.state?.['successData'];
      setTimeout(() => {
        this.successfullyRegisteredBudget = "";
      }, 3000);
    }
  }

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    const token = localStorage.getItem('token') as String;
    
    this.budgetService.listAll(token, this.currentPage).subscribe({
      next: (data) =>{
        if(data.content.length > 0){
          this.budgets = data.content;
          this.currentPage = data.pageable.pageNumber;
          this.totalPages = data.totalPages;
        }else{
          this.messageWithoutRegisteredBudgets = "Não foi possível listar os orçamentos, cadastre um orçamento e tente novamente!"
        }
      },
      error: (error) =>{
        if (error.error && error.error.message) {
          this.errorMessages.push(error.error.message);
        } else {
          this.errorMessages.push('Ocorreu um erro inesperado. Tente mais tarde, por favor!');
        }
      }
    })
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.listAll();
  }

}
