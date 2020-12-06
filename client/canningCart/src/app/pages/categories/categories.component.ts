import { Component, OnChanges, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = {nombre: '', categoria_id: 0};
  trashAlt = faTrashAlt;
  edit = faEdit;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this._categoryService.getCategories().subscribe((res: Category[]) => {
      this.categories = res;
    }, err => console.error);
  }

  deleteCategory(categoryId) {
    this._categoryService.deleteCategory(parseInt(categoryId)).subscribe(res => {
      this.getCategories();
    }, err => false);
  }

  async test(i: number) {
    this._categoryService.getCategory(i).subscribe(async (res) => {
      const { value: newCategoryName }: any = await Swal.fire({
        title: 'Editar categoria',
        input: 'text',
        // inputAttributes: {'value': categotyName},
        inputLabel: 'Nombre de la categoria',
        inputValue: res.nombre,
        inputPlaceholder: 'Nombre de categoria',
        showCancelButton: true,
      });
      Swal.fire({
        title: 'Actualizado categoria',
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
      });
      this._categoryService.updateCategory(i, { categoria_id: i, nombre: newCategoryName }).subscribe(res => {
        if (res) {
          Swal.fire({
            title: '¡La categoria se ha actualizado!',
            icon: 'success',
            timer: 1700
          });
          this.getCategories();
        } else {
          Swal.fire({
            title: 'Ha ocurrido algo mal',
            icon: 'error',
            allowEnterKey: true
          })
        }

      }, err => Swal.fire({
        title: 'Ha ocurrido algo mal',
        icon: 'error',
        allowEnterKey: true
      }));
    }, err => Swal.fire({
      title: 'Ha ocurrido algo mal',
      icon: 'error',
      allowEnterKey: true
    }));

  }

  async getNewCategory() {
    const { value: newCategoryName }: any = await Swal.fire({
      title: 'Nueva categoria',
      input: 'text',
      inputLabel: 'Nombre de la categoria',
      inputPlaceholder: 'Nombre de categoria',
      showCancelButton: true,
      showConfirmButton: true
    });
    this.newCategory.nombre = newCategoryName;
    this.createCategory();
  }

  createCategory() {
    Swal.fire({
      title: 'Creando categoria',
      text: 'por favor espere',
      icon: 'info'
    })
    this._categoryService.newCategory(this.newCategory).subscribe(res => {
      if (res) {
        Swal.fire({
          title: 'Se ha creado la categoria',
          icon: 'success',
          timer: 1700
        });
        this.getCategories();
      } else {
        Swal.fire({
          title: 'Algo ha salido mal!',
          icon: 'warning',
          allowEnterKey: true
        })
      }
    }, err => {
      console.error(err);
      Swal.fire({
        title: 'Algo ha salido mal!',
        text: err,
        icon: 'warning',
        allowEnterKey: true
      })
    })
  }
}
