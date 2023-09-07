import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterOutput } from 'src/app/models/register/registerOutput';
import { environment } from 'src/environments/environment';

const API_URL = environment.URL_API + "user"

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  findUserByToken(token: String): Observable<RegisterOutput>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<RegisterOutput>(API_URL, {headers});
  }
}
