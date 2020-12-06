import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;

  providerId: string | number;

  provider: Provider;

  constructor(
    private _providerServices: ProviderService,
    private _route: ActivatedRoute
  ) { 
    this.provider = {
      estado_id: 0,
      fecha: '',
      organizacion: '',
      persona_id: 0,
      proveedor_id: 0
    }
    this.providerId = this._route.snapshot.paramMap.get('id');
    this.getProvider();
  }

  ngOnInit(): void {
  }

  getProvider() {
    this._providerServices.getProvider(this.providerId).subscribe((res: any) => {
      this.provider = res;
      this.provider.fecha = this.dateTransform(res.fecha);
    }, err => console.error);
  }

  updateProvieder() {
    Swal.fire({
      title: 'Actualizando..',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });

    this._providerServices.getProvider(this.providerId).subscribe((res : any) => {
      if (res == this.provider) {
        Swal.fire({
          title: 'No se han hecho cambios',
          icon: 'info',
          allowEnterKey: true,
          allowEscapeKey: false
        });
      } else {
        this._providerServices.putProvider(this.providerId, this.provider).subscribe((res: any ) => {
          if (res.message == 'provider updated') {
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
