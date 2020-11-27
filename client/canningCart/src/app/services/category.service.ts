import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  URL: string = 'http://localhost:3000'
  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  getCategory(categoryId: number | string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/categories/${categoryId}`)
  }

  newCategory(categoryForm: Category) {
    return this.http.post(`${this.URL}/categories/`, categoryForm);
  }

  updateCategory(categoryId: number, categoryUpdated: Category): Observable<boolean> {
    return this.http.put(`${this.URL}/categories/${categoryId}`, categoryUpdated).pipe(
      map((res: {message: string}) => {
        if (res.message == 'Category updated') {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  deleteCategory(categoryId: number): Observable<boolean> {
    return this.http.delete(`${this.URL}/categories/${categoryId}`).pipe(
      map((res: {message: string}) => {
        if (res.message == 'Category deleted') {
          return true;
        } else {
          return false;
        }
      })
    )
  }
}
