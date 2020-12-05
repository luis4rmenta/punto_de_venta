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

  getPeople() {
    return this._http.get<Person[]>(`${this.URL}/people/`);
  }

  updatePerson(personId: number | string, personUpdated: Person) {
    return this._http.put(`${this.URL}/people/${personId}`, personUpdated);
  }

  removePerson(personId: number | string) {
    return this._http.delete(`${this.URL}/people/${personId}`);
  }

  addPerson(newPerson: Person) {
    return this._http.post(`${this.URL}/people/`, newPerson);
  }
  
}
