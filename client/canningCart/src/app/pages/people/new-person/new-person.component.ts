import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/interfaces/person';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faSave = faSave;

  //form
  form: FormGroup;

  constructor(
    private _peopleService: PeopleService,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      curp: [ '', [Validators.required, Validators.maxLength(18), Validators.minLength(18)] ],
      nombre: [ '', [Validators.required] ],
      primer_apellido: [ '', [Validators.required] ],
      segundo_apellido: [ '', [Validators.required]],
      direccion: [ '', [Validators.required, Validators.maxLength(70)] ],
      telefono: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")] ],
      email: [ '', [Validators.required, Validators.email] ],
      genero: [ '', [Validators.required, Validators.minLength(1), Validators.maxLength(1)] ],
      fecha_de_nacimiento: [ '', [Validators.required] ]
    });
  }

  addPerson() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    } else {
      Swal.fire({
        title: 'Agregando persona...',
        text: 'Por favor espera',
        icon: 'info',
        allowEnterKey: false,
        allowEscapeKey: false
      });

      const newPerson: Person = {
        curp: this.form.value.curp,
        direccion: this.form.value.direccion,
        email: this.form.value.email,
        fecha_de_nacimiento: this.form.value.fecha_de_nacimiento,
        genero: this.form.value.genero,
        nombre: this.form.value.nombre,
        primer_apellido: this.form.value.primer_apellido,
        segundo_apellido: this.form.value.segundo_apellido,
        telefono: this.form.value.telefono
      }

      this._peopleService.addPerson(newPerson).subscribe((res: {message?: string, person_id?: number}) => {
        if (res.message == 'person added') {
          Swal.fire({
            title: '¡Persona Agregada!',
            icon: 'success',
            text: `La persona se ha agregado al sistema con el ID: ${res.person_id}`,
            allowEscapeKey: false
          });
        } else {
          Swal.fire({
            title: '¡Ha ocurrido algo mal! D:',
            icon: 'error',
            allowEnterKey: true,
            allowEscapeKey: false
          });
        }
      }, err => {
        console.error(err);
          Swal.fire({
            title: '¡Ha ocurrido algo mal! D:',
            icon: 'error',
            allowEnterKey: true,
            allowEscapeKey: false
          });
      })
    }
  }

  get nombre() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get curp() {
    return this.form.get('curp').invalid && this.form.get('curp').touched;
  }
  get primer_apellido() {
    return this.form.get('primer_apellido').invalid && this.form.get('primer_apellido').touched;
  }
  get segundo_apellido() {
    return this.form.get('segundo_apellido').invalid && this.form.get('segundo_apellido').touched;
  }
  get direccion() {
    return this.form.get('direccion').invalid && this.form.get('direccion').touched;
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
  get fecha_de_nacimiento() {
    return this.form.get('fecha_de_nacimiento').invalid && this.form.get('fecha_de_nacimiento').touched;
  }



}
