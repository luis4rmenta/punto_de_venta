import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Output } from '../interfaces/output';
import { OutputDetail } from '../interfaces/output-detail';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private URL = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  getOutputs() {
    return this._http.get<Output[]>(`${this.URL}/outputs/`);
  }

  getOutput(outputId: number | string) {
    return this._http.get<Output>(`${this.URL}/outputs/${outputId}`);
  }

  postOutput(newOutput: Output) {
    return this._http.post(`${this.URL}/outputs/`, newOutput);
  }

  putOutput(outputId: string | number, outputUpdated: Output) {
    return this._http.put(`${this.URL}/outputs/${outputId}`, outputUpdated);
  }

  deleteOutput(outputId: string | number) {
    return this._http.delete(`${this.URL}/outputs/${outputId}`);
  }

  postOutputDetails(newOutputDetails: OutputDetail[]) {
    return this._http.post(`${this.URL}/outputdetails/array/`, {outputDetails: newOutputDetails});
  }
}
