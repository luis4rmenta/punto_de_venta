import { Component} from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Output } from 'src/app/interfaces/output';
import { EmployeeService } from 'src/app/services/employee.service';
import { OutputService } from 'src/app/services/output.service';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent {
  //icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  outputs: Output[] = [];
  employees: string[] = [];
  constructor(
    private _outputService: OutputService,
    private _peopleService: PeopleService,
    private _employeeService: EmployeeService
  ) {
    this.getOutputs();
   }

  getOutputs() {
    this._outputService.getOutputs().subscribe(res => {
      console.log('res');
      console.log(res);
      this.outputs = res;
      this.getEmployees();
    }, err => console.error);
  }

  getEmployees() {
    this.employees = [];
    this.outputs.forEach(output => {
      output.fecha = this.dateTransform(output.fecha);
      this._employeeService.getEmployee(output.empleado_id).subscribe(employee => {
        this._peopleService.getPerson(employee.persona_id).subscribe(person => {
          this.employees.push(`${person.nombre} ${person.primer_apellido}`);
        }, err => console.error);
      }, err => console.error);
    });
  }

  deleteOutput(outputId: number) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento por favor..',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false,
      showCancelButton: false
    });
    this._outputService.deleteOutput(outputId).subscribe((res: {message: string}) => {
      if (res.message == 'output deleted') {
        Swal.fire({
          title: 'Registro eliminado',
          icon: 'success',
          allowEnterKey: true,
          allowEscapeKey: false,
          showCancelButton: false,
          showConfirmButton: true,
          timer: 5000
        });
        this.getOutputs();
        this.getEmployees();
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
    
    return `${year}-${month}-${day} ${mySQLDate.slice(11,19)}`;
  }

  

  

}
