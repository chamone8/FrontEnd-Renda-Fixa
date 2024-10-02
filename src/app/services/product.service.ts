import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5081/api/products'; // Substitua pela URL correta da sua API

  constructor(private http: HttpClient) { }
 
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetProductAll`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/GetProduct`, { params: { Id: id } });
  }  

  purchaseProduct(idProduct: string, idAccount: string, quantity: number): Observable<any> {
    const body = { idProduct, idAccount, quantity };
    return this.http.post(`${this.apiUrl}/purchase`, body);
  }

  getPurchaseByAccount(accountId: string): Observable<any> {
    const url = `${this.apiUrl}/GetPurchasesByAccount?AccountId=${accountId}`;
    return this.http.get<any>(url);
  }
  
}
