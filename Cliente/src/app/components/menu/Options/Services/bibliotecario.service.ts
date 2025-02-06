import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BibliotecarioService {
  private apiUrl = 'http://localhost:3000/bibliotecarios'; // Asegúrate que la URL sea la correcta

  constructor(private http: HttpClient) {}

  // Registrar un nuevo bibliotecario
  addBibliotecario(bibliotecario: any): Observable<any> {
    return this.http.post(this.apiUrl, bibliotecario);
  }

  // Obtener todos los bibliotecarios
  getBibliotecarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Actualizar un bibliotecario
  updateBibliotecario(id: number, bibliotecario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bibliotecario);
  }

  // Eliminar un bibliotecario
  deleteBibliotecario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
