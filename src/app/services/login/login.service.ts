import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput } from 'src/app/models/login/loginInput';
import { LoginOutput } from 'src/app/models/login/loginOutput';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

const URL_API = environment.URL_API + "auth";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  auth(loginInput: LoginInput):Observable<LoginOutput>{
    return this.httpClient.post<LoginOutput>(URL_API, loginInput);
  }
}
