import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryId;
  category: Category;
  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryId = this._route.snapshot.paramMap.get('id');
    this.getCategoryData();
  }

  getCategoryData() {
    return this._categoryService.getCategory(this.categoryId).subscribe(res => {
      this.category = res;
    }, err => console.log);
  }

  updateCategory() {
    this._categoryService.updateCategory(this.categoryId, this.category).subscribe(res => res, err => console.log);
  }
  

}
