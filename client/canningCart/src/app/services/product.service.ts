import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.URL}/products/`);
  }

  getProduct(productId) {
    return this._http.get<Product>(`${this.URL}/products/${productId}`);
  }

  postProduct(newProduct: Product) {
    return this._http.post<{message: string, providerId: number}>(`${this.URL}/products/`, newProduct);
  }

  putProduct(providerid: number | string, providerUpdated: Product) {
    console.log(`${this.URL}/products/${providerid}`);
    return this._http.put(`${this.URL}/products/${providerid}`, providerUpdated);
  }

  deleteProduct(providerId: number | string) {
    return this._http.delete<{message: string}>(`${this.URL}/products/${providerId}`);
  }

  getProductByCodebar(codebar: number | string) {
    return this._http.get<Product>(`${this.URL}/products/codebar/${codebar}`);
  }

  getProductByName(productName: string) {
    return this._http.get<Product[]>(`${this.URL}/products/name/${productName}`);
  }
}
