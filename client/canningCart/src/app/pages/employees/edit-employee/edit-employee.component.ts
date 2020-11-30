import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { title } from 'process';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;

  employeeId: number;
  oldmployee: Employee;
  newEmployee: Employee = {
    fecha: '2020-12-01',
    tipo_empleado_id: 0,
    empleado_id: 0,
    persona_id: 0
  };

  constructor(
    private _employeeService: EmployeeService,
    private _route: ActivatedRoute
    ) { 
      this.employeeId = parseInt(this._route.snapshot.paramMap.get('id'));
      this.getEmployee();

  }

  getEmployee() {
    this._employeeService.getEmployee(this.employeeId).subscribe(res => {
      if (res.empleado_id) {
        this.newEmployee = res;
        this.oldmployee = res;
      } else {
        return;
      }
    }, err => console.log(`Error:${err}`));

  }

  updateEmployee() {
    Swal.fire({
      title: 'Cargando..',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });
    this._employeeService.getEmployee(this.employeeId).subscribe(res => {
      console.log(res);
      console.log(this.newEmployee);
      if (res === this.newEmployee) {
        Swal.fire({
          title: 'No se han realizado cambios aún',
          icon: 'info',
          allowEnterKey: true
        });
      } else {
        console.log('old y new no es igual');
        this._employeeService.updateEmployee(this.employeeId, this.newEmployee).subscribe((res: any) => {
          if (res.message == 'Employee updated') {
            Swal.fire({
              title: 'Exito al actualizar',
              icon: 'success',
              timer: 2000
            });
          } else {
            Swal.fire({
              title: 'Algo ha salido mal.. D: 1',
              icon: 'warning',
              allowEscapeKey: false
            });
          }
        }, err => {
          Swal.fire({
            title: 'Algo ha salido mal.. D: 2',
            icon: 'warning',
            allowEscapeKey: false
          });
          console.error(err);
        });
      }
    }, err => {
      Swal.fire({
        title: 'Algo ha salido mal.. D: 3',
        icon: 'warning',
        allowEscapeKey: false
      });
      console.error(err);
    });
  }


  ngOnInit(): void {
  }

}
