import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { ValidatorService } from 'src/app/services/validators/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faSave = faSave;

  //form
  form: FormGroup;
  constructor(
    private _providerService: ProviderService,
    private fb: FormBuilder 
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      persona_id: [ '', [Validators.required] ],
      organizacion: [ '', [Validators.required] ],
      estado_id: [ '', [Validators.required] ],
    });
  }

  addProvider() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    } else {
      Swal.fire({
        title: 'Agregando proveedor...',
        text: 'Por favor espera',
        icon: 'info',
        allowEnterKey: false,
        allowEscapeKey: false,
      });

      const newProvider: Provider = {
        estado_id: this.form.value.estado_id,
        fecha: this.getDateTime(),
        organizacion: this.form.value.organizacion,
        persona_id: this.form.value.persona_id,
      }
  
      this._providerService.postProvider(newProvider).subscribe(res => {
        if (res.message == 'provider added') {
          Swal.fire({
            title: '¡Proveedor Agregado!',
            icon: 'success',
            text: `EL proveedor se ha agregado al sistema con el ID: ${res.providerId}`,
            allowEscapeKey: false
          });
          this.form.reset();
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
      });
    }

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

  get persona_id() {
    return this.form.get('persona_id').invalid && this.form.get('persona_id').touched;
  }
  get organizacion() {
    return this.form.get('organizacion').invalid && this.form.get('organizacion').touched;
  }
  get estado_id() {
    return this.form.get('estado_id').invalid && this.form.get('estado_id').touched;
  }
  get fecha() {
    return this.form.get('fecha').invalid && this.form.get('fecha').touched;
  }

}
