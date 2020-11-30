import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  getEmployees() {
     return this._http.get<Employee[]>(`${this.URL}/employees/`);
  }

  getEmployee(employeeId: number | string) {
    console.log('buscando employee');
    return this._http.get<Employee>(`${this.URL}/employees/${employeeId}`);
  }
  
  newEmployee(newEmployee: Employee | {person: Person, employee: Employee}) {
    return this._http.post(`${this.URL}/employees`, newEmployee);
  }

  updateEmployee(employeeId: string | number, employeeUpdated: Employee) {
    'actualizando employee'
    return this._http.put(`${this.URL}/employees/${employeeId}`, employeeUpdated);
  }

  deleteEmployee(employeeId: number | string) {
    return this._http.delete(`${this.URL}/employees/${employeeId}`);
  }

  

}
