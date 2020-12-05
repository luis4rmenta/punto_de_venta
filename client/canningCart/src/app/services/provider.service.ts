import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private URL = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  getProviders(): Observable<Provider[]> {
    return this._http.get<Provider[]>(`${this.URL}/providers/`);
  }

  getProvider(providerId) {
    return this._http.get<Provider>(`${this.URL}/providers/${providerId}`);
  }

  postProvider(newProvider: Provider) {
    return this._http.post<{message: string, providerId: number}>(`${this.URL}/providers/`, newProvider);
  }

  putProvider(providerid: number | string, providerUpdated: Provider) {
    console.log(providerid);
    console.log(providerUpdated);
    console.log(`${this.URL}/providers/${providerid}`);
    return this._http.put(`${this.URL}/providers/${providerid}`, providerUpdated);
  }

  deleteProvider(providerId: number | string) {
    return this._http.delete<{message: string}>(`${this.URL}/providers/${providerId}`);
  }
}
