import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/interfaces/employee';
import { Person } from 'src/app/interfaces/person';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  
  form: FormGroup
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  
  
  
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.createForm();
    }

  ngOnInit(): void {
  }

  createEmployee() {
    if (this.form.invalid) {
      return;
    }
    Swal.fire({
      title: 'Cargando..',
      text: 'Espere unos segundo por favor',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });
    console.log(this.form);
    const newEmployee: {person: Person, employee: Employee} = {
      employee: {
        fecha: this.form.value.fecha,
        tipo_empleado_id: this.form.value.tipo_empleado_id,
      }, 
      person: {
        curp: this.form.value.curp,
        direccion: this.form.value.direccion,
        email: this.form.value.email,
        fecha_de_nacimiento: this.form.value.fecha_de_nacimiento,
        genero: this.form.value.genero,
        nombre: this.form.value.nombre,
        primer_apellido: this.form.value.apellido_paterno,
        segundo_apellido: this.form.value.apellido_materno,
        telefono: this.form.value.telefono,
      }
    };
    this.employeeService.newEmployee(newEmployee).subscribe((res: {message: string, personId: number, employeeId: number}) => {
      if (res.message == 'Employee created') {
        Swal.fire({
          title: '¡Empleado contratado!',
          icon: 'success',
          text: `El empleado se ha registrado con el ID persona: ${res.employeeId} y su número de empleado es: ${res.personId}`,
          allowEnterKey: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({
          title: 'Algo ha ocurrido mal! D:',
          icon: 'warning',
          allowEscapeKey: false
        });
      }
    }, err => {
      console.error(err);
      Swal.fire({
        title: 'Algo ha ocurrido mal! D:',
        icon: 'warning',
        allowEscapeKey: false
      });
    });

    this.form.reset();

  }
  
  comeBack() {
    this.router.navigate(['/employees']);
  }

  getDateTime(): string {
    const dt = new Date();
    return `${dt.getFullYear().toString().padStart(4, '0')}-${
            (dt.getMonth()+1).toString().padStart(2, '0')}-${
            dt.getDate().toString().padStart(2, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`;
}

  

  createForm() {
    this.form = this.fb.group({
      nombre: [ '', [Validators.required, Validators.maxLength(45)] ],
      apellido_paterno: [ '', [Validators.required, Validators.maxLength(45)]],
      apellido_materno: [ '', [Validators.required, Validators.maxLength(45)] ],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)] ],
      telefono: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")] ],
      email: [ '', [Validators.required, Validators.email, Validators.maxLength(50)] ],
      genero: [ '', [Validators.required, Validators.maxLength(1)] ],
      direccion: [ '', [Validators.required, Validators.maxLength(70)] ],
      fecha_de_nacimiento: [ '', [Validators.required]],
      tipo_empleado_id: ['', [Validators.required] ],
      fecha: [ this.getDateTime() , []]
    })
  }

  get nombre() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellido_paterno() {
    return this.form.get('apellido_paterno').invalid && this.form.get('apellido_paterno').touched;
  }
  get apellido_materno() {
    return this.form.get('apellido_materno').invalid && this.form.get('apellido_materno').touched;
  }
  get curp() {
    return this.form.get('curp').invalid && this.form.get('curp').touched;
  }
  get telefono() {
    return this.form.get('telefono').invalid && this.form.get('telefono').touched;
  }
  get email() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get genero() {
    return this.form.get('genero').invalid && this.form.get('genero').touched;
  }
  get direccion() {
    return this.form.get('direccion').invalid && this.form.get('direccion').touched;
  }
  get fecha_de_nacimiento() {
    return this.form.get('fecha_de_nacimiento').invalid && this.form.get('fecha_de_nacimiento').touched;
  }
  get tipo_empleado_id() {
    return this.form.get('tipo_empleado_id').invalid && this.form.get('tipo_empleado_id').touched;
  }

}
