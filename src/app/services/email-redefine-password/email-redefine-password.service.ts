import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailRedefinePasswordInput } from 'src/app/models/email-redefine-password/emailRedefinePasswordInput';
import { environment } from 'src/environments/environment';

const URL_API = environment.URL_API + "user/redefine-password";

@Injectable({
  providedIn: 'root'
})
export class EmailRedefinePasswordService {
  
  constructor(private http: HttpClient) { }

  sendEmailRedefinePassword(emailRedefinePasswordInput: EmailRedefinePasswordInput): Observable<void> {
    return this.http.post<void>(URL_API, emailRedefinePasswordInput);
  }
}
