import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  roll: string;

  constructor(public authService: AuthService) { }  

  ngOnInit(): void {
    this.authService.getUserType().subscribe(res => this.roll = res.roll, err => console.log);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.authService.getUserType().subscribe(res => this.roll = res.roll, err => console.log);
    
  }


}
