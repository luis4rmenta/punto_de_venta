import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(user: RegisterForm): Observable<AuthResponse> {
    if (typeof user.employeeId === 'string') {
      user.employeeId = parseInt(user.employeeId);
    }
    return this.http.post<AuthResponse>(`${this.URL}/auth/register`, user);
  }

  login(user: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.URL}/auth/login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['/login']);
  }

  isAdministrator() {
    return this.http.get(`${this.URL}/auth/userType`).pipe(map( (res: {roll: string}) => {
      if (res.roll == 'admin') {
        return true;
      } else {
        return false
      }
    }));
  }


  isModerator() {
    return this.http.get(`${this.URL}/auth/userType`).pipe(map( (res: {roll: string}) => {
      if (res.roll == 'moderator' || res.roll == 'admin' ) {
        return true;
      } else {
        return false
      }
    }));
  }

  isEmployee(){
    return this.http.get(`${this.URL}/auth/userType`).pipe(map( (res: {roll: string}) => {
      if (res.roll == 'employee' ) {
        return true;
      } else {
        return false
      }
    }));
  }

  getUserType(): Observable<{roll: string}> {
    return this.http.get<{roll: string}>(`${this.URL}/auth/userType`);
  }


}
