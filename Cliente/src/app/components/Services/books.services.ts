import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = 'https://bibliotecaapi-4.onrender.com/api/books';  // URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener libros
  getBooks(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${searchTerm}`);
  }
}

