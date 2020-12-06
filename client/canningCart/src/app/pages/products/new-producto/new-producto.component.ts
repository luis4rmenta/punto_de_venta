import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {
  //icons
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;

  //form
  form: FormGroup

  categories: Category[] = [];

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private _categoryService: CategoryService
  ) { 
    this.createForm();
    this.getCategories();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      nombre: [ '', [Validators.required] ],
      codigo_de_barras: [ '', [Validators.required] ],
      estado_id: [ '', [Validators.required] ],
      fecha_de_creacion:  [ '', [] ],
      costo: [ '', [Validators.required] ],
      precio: [ '', [Validators.required] ],
      stock: [ '', [Validators.required] ],
      categoria: ['', [Validators.required] ]
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => console.error)
  }

  addProduct() {
    if (this.form.invalid) {
      return;
    } else {
      this.swalLoad();
      this.form.value.fecha_de_creacion = this.getDateTime();
      this.form.value.categoria_id = this.form.value.categoria;

      this._productService.postProduct(this.form.value).subscribe((res: {message:string, productId?: number}) => {
        if (res.message = 'Product added') {
          this.swalSuccess(res.productId)
          this.form.reset();
        } else {
          this.swalError();
        }
      }, err => this.swalError(err));
    }
  }

  get nombre() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get codigo_de_barras() {
    return this.form.get('codigo_de_barras').invalid && this.form.get('codigo_de_barras').touched;
  }
  get estado_id() {
    return this.form.get('estado_id').invalid && this.form.get('estado_id').touched;
  }
  get fecha_de_creacion() {
    return this.form.get('fecha_de_creacion').invalid && this.form.get('fecha_de_creacion').touched;
  }
  get costo() {
    return this.form.get('costo').invalid && this.form.get('costo').touched;
  }
  get precio() {
    return this.form.get('precio').invalid && this.form.get('precio').touched;
  }
  get stock() {
    return this.form.get('stock').invalid && this.form.get('stock').touched;
  }
  get categoria() {
    return this.form.get('categoria').invalid && this.form.get('categoria').touched;
  }

  private getDateTime(): string {
    const dt = new Date();
    return `${dt.getFullYear().toString().padStart(4, '0')}-${
            (dt.getMonth()+1).toString().padStart(2, '0')}-${
            dt.getDate().toString().padStart(2, '0')} ${
            dt.getHours().toString().padStart(2, '0')}:${
            dt.getMinutes().toString().padStart(2, '0')}:${
            dt.getSeconds().toString().padStart(2, '0')}`;
  }

  private swalError(err?) {
    if (err) {
      console.error(err);
    }
    Swal.fire({
      title: '¡Ha ocurrido algo mal! D:',
      icon: 'error',
      allowEnterKey: true,
      allowEscapeKey: false
    });
  }
  private swalLoad() {
    Swal.fire({
      title: 'Agregando producto...',
      text: 'Por favor espera',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false,
    });
  }

  private swalSuccess(id?) {
    Swal.fire({
      title: '¡Proveedor Agregado!',
      icon: 'success',
      text: `EL proveedor se ha agregado al sistema con el ID: ${id}`,
      allowEscapeKey: false
    });
  }


}
