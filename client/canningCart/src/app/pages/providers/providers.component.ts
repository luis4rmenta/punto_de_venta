import { Component, OnInit } from '@angular/core';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  //icons
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  
  providers: Provider[] = [];
  providersName: string[] = [];


  constructor(
    private _providerService: ProviderService,
    private _personService: PeopleService
    ) { 
    this.getProviders();
  }

  ngOnInit(): void {
  }

  getProviders() {
    this.providers = [];
    this.providersName = [];
    this._providerService.getProviders().subscribe(res => {
      console.log(res);
      this.providers = res;
      res.forEach(provider => {
        this._personService.getPerson(provider.persona_id).subscribe(res => {
          this.providersName.push(`${res.nombre} ${res.primer_apellido}`);
        }, err => this.providersName.push('Error'));
      });
    }, err => console.log);
  }

  getName(personId: number | string) {
    this._personService.getPerson(personId).subscribe(res => {
      return `${res.nombre} ${res.primer_apellido}`
    }, err => `Error`);
    return 'asd'
  }

  deleteProvider(providerId: number | string) {
    Swal.fire({
      title: 'Eliminando empleado...',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });
    this._providerService.deleteProvider(providerId).subscribe(res => {
      if (res.message == 'provider deleted') {
        Swal.fire({
          title: 'Proveedor eliminado',
          text: `El proveedor con el ID ${providerId} ha sido eliminado`,
          icon: 'success',
          allowEscapeKey: false,
          timer: 5000
        });
      } else {
        Swal.fire({
          title: '¡Algo ha salido mal! D:',
          allowEscapeKey: false,
          icon: 'error'
        });
      }
      this.getProviders();
    }, err => {
      console.error(err);
      Swal.fire({
        title: '¡Algo ha salido mal! D:',
        allowEscapeKey: false,
        showCancelButton: false,
        icon: "error"
      });
    });
  }
}
