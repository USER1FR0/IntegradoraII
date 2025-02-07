import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
//import jwtDecode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://bibliotecaapi-4.onrender.com'; // URL base de tu backend

  constructor(private http: HttpClient,private router:Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }
  isLoggedIn(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return !!localStorage.getItem('token'); // Ejemplo usando un token en localStorage
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

}
