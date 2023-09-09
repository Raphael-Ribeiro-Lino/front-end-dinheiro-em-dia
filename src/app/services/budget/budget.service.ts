import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetOutput } from 'src/app/models/budget/budgetOutput';
import { PaginationOutput } from 'src/app/models/pagination/paginationOutput';
import { environment } from 'src/environments/environment';

const API_URL = environment.URL_API + "budgets"

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private httpClient:HttpClient) { }

  listAll(token: String, numPage: number):Observable<PaginationOutput<BudgetOutput>>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<PaginationOutput<BudgetOutput>>(API_URL+`?page=${numPage}`, {headers});
  }
}
