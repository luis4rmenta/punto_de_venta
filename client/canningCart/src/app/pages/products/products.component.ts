import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'src/app/interfaces/input';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  products: Product[] = [];

  constructor(
    private _productService: ProductService
  ) { 
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(): void {
    this._productService.getProducts().subscribe(res => {
      this.products = res;
      console.log(this.products);
    }, err => console.error);
  }

  deleteProducto(productId: number | string) {
    Swal.fire({
      title: 'Eliminando producto...',
      text: 'Por favor espere un momento',
      icon: 'info',
      allowEnterKey: false,
      allowEscapeKey: false
    });
    this._productService.deleteProduct(productId).subscribe(res => {
      if (res.message == 'Product deleted') {
        Swal.fire({
          title: '¡Producto eliminado!',
          text: `El producto con el ID ${productId} ha sido eliminado`,
          icon: 'success',
          allowEscapeKey: false,
          timer: 5000
        });
        this.getProducts();
      } else {
        Swal.fire({
          title: '¡Algo ha salido mal! D:',
          allowEscapeKey: false,
          icon: 'error'
        });
      }
    }, err => {
      console.error(err);
      Swal.fire({
        title: '¡Algo ha salido mal! D:',
        allowEscapeKey: false,
        showCancelButton: false,
        icon: "error"
      });
    })
  }
}
