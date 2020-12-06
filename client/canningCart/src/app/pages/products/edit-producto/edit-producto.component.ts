import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  //icons
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  
  productId: number;

  categories: Category[] = [];
  product: Product = {
    categoria_id: 0,
    codigo_de_barras: '',
    costo: 0,
    estado_id: 0,
    fecha_de_creacion: '',
    nombre: '',
    precio: 0,
    stock: 0,
  };

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) { 
    this.productId = parseInt(this._route.snapshot.paramMap.get('id'));
    this.getCategories();
    this.getProduct();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => console.error);
  }

  getProduct() {
    this._productService.getProduct(this.productId).subscribe(res => {
      this.product = res;
      console.log(this.product);
      this.product.fecha_de_creacion = this.dateTransform(res.fecha_de_creacion);
    }, err => console.error);
  }

  updateProduct() {
    this.swalLoad();
    this._productService.getProduct(this.productId).subscribe((res) => {
      if (this.product == res) {
        this.swalNoChanges();
      } else {
        this._productService.putProduct(this.productId, this.product).subscribe((res: {message: string}) => {
          if (res.message == 'product updated') {
            this.swalSuccess();
          } else {
            this.swalError();
          }
        }, err => this.swalError(err))
      }
    }, err => this.swalError(err))
  }

  private dateTransform(mySQLDate: string) {
    const str = mySQLDate.slice(0, 10).split('-');
    const year = str[0];
    const month = str[1];
    const day = str[2];
    
    return `${year}-${month}-${day}`;
  }

  private swalError(err?) {
    if (err) {
      console.error(err);
    }
    Swal.fire({
      title: '¡Ha ocurrido algo mal! D:',
      icon: 'warning',
      allowEscapeKey: false
    });
  }
  private swalLoad() {
    Swal.fire({
      title: 'Actualizando..',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });
  }
  private swalNoChanges() {
    Swal.fire({
      title: 'No se han hecho cambios',
      icon: 'info',
      allowEnterKey: true,
      allowEscapeKey: false
    });
  }
  private swalSuccess() {
    Swal.fire({
      title: 'Datos Actualizados',
      icon: 'success',
      allowEscapeKey: false,
      timer: 2000
    });
  }

}
