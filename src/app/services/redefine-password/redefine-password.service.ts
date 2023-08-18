import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedefinePasswordInput } from 'src/app/models/redefine-password/redefinePasswordInput';
import { environment } from 'src/environments/environment';

const API_URL = environment.URL_API + "user/";

@Injectable({
  providedIn: 'root'
})
export class RedefinePasswordService {
  
  constructor(private httpClient: HttpClient) { }
  
  verifyHash(hash: string | null): Observable<void> {
    return this.httpClient.get<void>(API_URL + `${hash}/redefine-password`);
  }
  
  redefinePassword(redefinePasswordInput: RedefinePasswordInput, hash: string | null): Observable<void> {
    return this.httpClient.put<void>(API_URL + `redefine-password/${hash}`, redefinePasswordInput);
  }
}
