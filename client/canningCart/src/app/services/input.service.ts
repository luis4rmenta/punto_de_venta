import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Input } from '../interfaces/input';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  URL = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getInputs() {
    return this._http.get<Input[]>(`${this.URL}/inputs`);
  }

  getInput(inputId: number | string) {
    return this._http.get<Input>(`${this.URL}/inputs/${inputId}`);
  }

  putInput(inputId: number | string, inputUpdated: Input) {
    return this._http.put(`${this.URL}/inputs/${inputId}`, inputUpdated);
  }

  postInput(newInput: Input) {
    return this._http.post(`${this.URL}/inputs`, newInput);
  }

  deleteInput(inputId: number | string) {
    return this._http.delete(`${this.URL}/inputs/${inputId}`);
  }
}
