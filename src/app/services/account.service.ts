import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:5081/api/Account';

  constructor(private http: HttpClient) { }

  getAccount(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.apiUrl}/List`);
  }

  CreateAccount(name: string, balance: number): Observable<any> {
    // Codifica o nome e o balance diretamente na URL como query parameters
    return this.http.post(`${this.apiUrl}/Create?name=${encodeURIComponent(name)}&balance=${balance}`, {});
  }
}
