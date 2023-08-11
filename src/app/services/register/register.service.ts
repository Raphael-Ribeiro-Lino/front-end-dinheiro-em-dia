import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterInput } from 'src/app/models/register/registerInput';
import { RegisterOutput } from 'src/app/models/register/registerOutput';
import { environment } from 'src/environments/environment';

const URL_API = environment.URL_API + "user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(registerInput: RegisterInput): Observable<RegisterOutput> {
    return this.httpClient.post<RegisterOutput>(URL_API, registerInput);
  }
}
