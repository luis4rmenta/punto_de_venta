import { Component, OnChanges, OnInit } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { Output } from 'src/app/interfaces/output';
import { OutputDetail } from 'src/app/interfaces/output-detail';
import { Product } from 'src/app/interfaces/product';
import { OutputService } from 'src/app/services/output.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {
  //icons
  faTrashAlt = faTrashAlt;
  faShoppingCart = faShoppingCart;

  codeBar: string = '';
  total: number = 0;
  products: { product: Product, quantity: number }[] = [];
  searchProducts: Product[] = [];

  constructor(
    private _productService: ProductService,
    private _outputService: OutputService
  ) {
    console.log(this.products);
  }

  ngOnInit(): void {
  }

  valor(e: string) {
    if (this.isCodebar(this.codeBar)) {
      if (this.codeBar.includes(' ')) {
        let found = false;
      this.products.forEach(item => {
        console.log('for');
        if (item.product.codigo_de_barras == this.codeBar.replace(' ', '')) {
          item.quantity++;
          this.codeBar = '';
          found = true;
        }
      });
      this.getTotal();
      if (found) return;

      this._productService.getProductByCodebar(this.codeBar).subscribe(product => {
        console.log(product);
        this.products.push({ product: product, quantity: 1 });
        this.codeBar = '';
        this.getTotal();
      }, err => console.error);
      }
    } else {
      this._productService.getProductByName(this.codeBar).subscribe(res => {
        this.searchProducts = res;
        console.log(res);
        console.log(this.searchProducts);
      }, err => console.error);
    }
  }

  getTotal() {
    const xProducts: number[] = [];
    this.products.forEach(item => {
      xProducts.push(item.product.precio * item.quantity);
    });
    this.total = 0;
    xProducts.forEach(nums => {
      this.total = this.total + nums;
    });
    console.log(xProducts);
  }


  private isCodebar(str: string) {
    return !isNaN(parseInt(str));
  }

  cancel() {
    this.codeBar = '';
    this.total = 0;
    this.products = [];
    this.searchProducts = [];
  }

  
  newSale() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Tratando de realizar la venta',
      icon: 'info',
      showConfirmButton: false,
      showCancelButton: false,
      allowEnterKey: false,
      allowEscapeKey: false
    });
    const output: Output = {
      empleado_id: 0,
      estado_id: 1,
      fecha: this.getDateTime(),
      total: this.total
    }

    this._outputService.postOutput(output).subscribe((res: any) => {
      console.log(res);
      
      let outPutDetails: OutputDetail[] = [];
      this.products.forEach(item => {
        const outputDetail: OutputDetail = {
          cantidad: item.quantity,
          costo_unitario: item.product.costo,
          precio_unitario: item.product.precio,
          producto_id: item.product.producto_id,
          venta_id: res.outputId,
        };
        outPutDetails.push(outputDetail);
      });
  
      this._outputService.postOutputDetails(outPutDetails).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'success') {
          Swal.fire({
            title: 'Exito al realizar la compra',
            text: 'La compra se ha realizado exitosamente',
            icon: 'success',
            showCancelButton: false,
            allowEnterKey: false,
            timer: 5000
          });
        } else {
          console.log('else error swal');
          this.swalError();
        }
      }, err => this.swalError(err))
    }, err => this.swalError(err))
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
     title: '¡Algo ha ocurrido mal! D:',
     icon: 'error',
     allowEnterKey: true,
     allowEscapeKey: false,
     showCancelButton: false,
     showConfirmButton: true
   });
 }

}
