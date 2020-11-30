import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private URL: string = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }
  
  getPerson(personId: number | string) {
    return this._http.get<Person>(`${this.URL}/people/${personId}`);
  }
  
}
