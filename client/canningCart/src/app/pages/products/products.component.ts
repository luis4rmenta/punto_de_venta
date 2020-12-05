import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'src/app/interfaces/input';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  imputs: Input[] = []

  constructor() { }

  ngOnInit(): void {
  }

  getImputs() {
    
  }

}
