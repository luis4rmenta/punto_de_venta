import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: LoginForm = {
    user: '',
    password: ''
  }

  userData: AuthResponse;


  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.location.reload();
  }

  login() {
    this._authService.login(this.loginForm).subscribe(res => {
      localStorage.setItem('token', res.data.accessData.accessToken);
      this.userData = res;
      this.loginForm = {
        password: '',
        user: ''
      }
      this._router.navigate(['/hub']);
      // window.location.reload();
      // this._router.navigate(['/hub']);
    }, err => {
      console.log(err);
    });
  }

}
