import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { RegisterForm } from 'src/app/interfaces/register-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: RegisterForm = {
    employeeId: '',
    user: '',
    password: ''
  }

  userData: AuthResponse

  constructor(
    private _authSerivce: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm);
    this._authSerivce.register(this.registerForm).subscribe(res => {
      console.log('se obtuvo una respuesta');
      localStorage.setItem('token', res.data.accessData.accessToken);
      this.registerForm = {
        employeeId: '',
        password: '',
        user: ''
      }
      console.log(res);
      this.userData = res;
      console.log(this.userData);
    }, err => {
      console.log('ha ocurrido un error', err);
    });
  }

}
