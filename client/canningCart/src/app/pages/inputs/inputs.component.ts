import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/interfaces/employee';
import { Input } from 'src/app/interfaces/input';
import { Provider } from 'src/app/interfaces/provider';
import { EmployeeService } from 'src/app/services/employee.service';
import { InputService } from 'src/app/services/input.service';
import { PeopleService } from 'src/app/services/people.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent {
  //incons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  inputs: Input[] = [];
  providers: string[] = [];
  employees: string[] = [];

  constructor(
    private _inputService: InputService,
    private _employeeService: EmployeeService,
    private _providerService: ProviderService,
    private _peopleService: PeopleService
  ) { 
    this.getInputs();
  }

  getProviders() {
    this.providers = [];
    this.employees = [];
    this.inputs.forEach(input => {
      input.fecha = this.dateTransform(input.fecha);
      this._employeeService.getEmployee(input.empleado_id).subscribe(res => {
        this._peopleService.getPerson(res.persona_id).subscribe(person => {
          this.employees.push(`${person.nombre} ${person.primer_apellido}`);
        }, err => console.error)
      }, err => console.error);
      this._providerService.getProvider(input.proveedor_id).subscribe(provider => {
        this._peopleService.getPerson(provider.persona_id).subscribe(person => {
          this.providers.push(`${person.nombre} ${person.primer_apellido}`);
        }, err => console.error)
      }, err => console.error);
    });
    console.log(this.providers);
    console.log(this.employees);
  }

  getInputs() {
    this._inputService.getInputs().subscribe(res => {
      console.log(res);
      this.inputs = res;
    this.getProviders();

    }, err => console.error);
  }

  deleteInput(inputId: number) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor..',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false,
      showCancelButton: false
    });
    this._inputService.deleteInput(inputId).subscribe((res: {message: string}) => {
      if (res.message == 'input deleted') {
        Swal.fire({
          title: 'Registro eliminado',
          icon: 'success',
          allowEnterKey: true,
          allowEscapeKey: false,
          showCancelButton: false,
          showConfirmButton: true,
          timer: 5000
        });
        this.getInputs();
      } else {
        this.swalError();
      }
    }, err => this.swalError(err));
  } 

  swalError(err?) {
    if (err) {
      console.error(err)
    }
    Swal.fire({
      title: '¡Algo ha salido mal! D:',
      icon: 'error',
      showCancelButton: false
    });
  }

  private dateTransform(mySQLDate: string) {
    const str = mySQLDate.slice(0, 10).split('-');
    const year = str[0];
    const month = str[1];
    const day = str[2];
    console.log(mySQLDate);
    
    return `${year}-${month}-${day} ${mySQLDate.slice(11,19)}`;
  }



}
