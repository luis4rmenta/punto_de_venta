import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/interfaces/person';
import { PeopleService } from 'src/app/services/people.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  
  personId: number;
  person: Person = {
    curp: '',
    direccion: '',
    email: '',
    fecha_de_nacimiento: '',
    genero: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    telefono: '',
    person_id: 0
  }

  constructor(
    private _peopleService: PeopleService,
    private _route: ActivatedRoute
    ) { 
      this.personId = parseInt(this._route.snapshot.paramMap.get('id'));
      this.getPerson();
    }

  ngOnInit(): void {
  }

  getPerson() {
    this._peopleService.getPerson(this.personId).subscribe(res => {
      console.log(res);
      this.person = res;
      this.person.fecha_de_nacimiento = this.dateTransform(res.fecha_de_nacimiento);
      this.person.email = res.email;
      console.log(this.person);
      console.log(this.person.email);
    }, err => console.error);
  }

  updatePerson() {
    Swal.fire({
      title: 'Actualizando..',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });

    this._peopleService.getPerson(this.personId).subscribe(res => {
      if (res == this.person) {
        Swal.fire({
          title: 'No se han hecho cambios',
          icon: 'info',
          allowEnterKey: true,
          allowEscapeKey: false
        });
      } else {
        this._peopleService.updatePerson(this.personId, this.person).subscribe((res: any) => {
          if (res.message == 'Person updated') {
            Swal.fire({
              title: 'Datos Actualizados',
              icon: 'success',
              allowEscapeKey: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              title: '¡Ha ocurrido algo mal! D:',
              icon: 'warning',
              allowEscapeKey: false
            });
          }
        }, err => {
          Swal.fire({
            title: '¡Ha ocurrido algo mal! D:',
            icon: 'warning',
            allowEscapeKey: false
          });
          console.error(err);
        })
      }
    }, err => {
      Swal.fire({
        title: '¡Ha ocurrido algo mal! D:',
        icon: 'warning',
        allowEscapeKey: false
      });
      console.error(err);
    });
  }
  
  private dateTransform(mySQLDate: string) {
    const str = mySQLDate.slice(0, 10).split('-');
    const year = str[0];
    const month = str[1];
    const day = str[2];
    
    return `${year}-${month}-${day}`;
  }

}
