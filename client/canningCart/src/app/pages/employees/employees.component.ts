import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { PeopleService } from 'src/app/services/people.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  trashAlt = faTrash;
  edit = faEdit;
  roll: string;

  
  view: boolean;
  employees: {
    employeeId: number |string,
    PersonId: number
    employeeName: string,
    employeeType: string,
    date: string
  }[] = [];

  constructor(
    private _employeeService: EmployeeService,
    private _personService: PeopleService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.authService.getUserType().subscribe(res => this.roll = res.roll, err => console.error);
  }

  getEmployees() {
    this.employees = [];
    this._employeeService.getEmployees().subscribe(employees => {
      employees.forEach((employee) => {
        
        this._personService.getPerson(employee.persona_id).subscribe(person => {
          const employeeName = `${person.nombre} ${person.primer_apellido} ${person.segundo_apellido}`
          let employeeType: string;
          switch (employee.tipo_empleado_id) {
            case 1: employeeType = 'Admin'
              break;
            case 2: employeeType = 'Moderador'
              break;
            case 3: employeeType = 'Cajero'
              break;
            default: employeeType = 'Desconocido'
              break;
          }
          this.employees.push({
            PersonId: employee.persona_id,
            date: employee.fecha,
            employeeId: employee.empleado_id,
            employeeName: employeeName,
            employeeType: employeeType
          });

        }, err => console.error);
      });
    }, err => console.error);
  }

  deleteEmployee(employeeId: number) {
    this._employeeService.deleteEmployee(employeeId).subscribe(res => {
      this.getEmployees();
    }, err => console.error);
  }


}
