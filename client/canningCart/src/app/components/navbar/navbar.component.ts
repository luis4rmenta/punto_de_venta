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
  
}
