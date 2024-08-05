import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbooks',
  templateUrl: './NewBooks.component.html',
  styleUrls: ['./NewBooks.component.css']
})
export class NewBooksComponent {  
  nombreLibro: string = '';
  autor: string = '';
  tema: string = '';
  categoria: string = '';
  informacion: string = '';
  isbn: string = '';
  ejemplares: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  saveBook() {
    if (!this.nombreLibro.trim()) {
      alert('El campo "Nombre del Libro" es obligatorio.');
      return;
    }

    if (!this.autor.trim()) {
      alert('El campo "Autor" es obligatorio.');
      return;
    }

    if (!this.tema.trim()) {
      alert('El campo "Tema" es obligatorio.');
      return;
    }

    if (!this.categoria.trim()) {
      alert('El campo "Categoría" es obligatorio.');
      return;
    }

    if (this.nombreLibro.length > 50 || this.autor.length > 50 || this.tema.length > 50 || this.categoria.length > 50) {
      alert('Los campos Nombre_Libro, Autor, Tema y Categoría deben tener un máximo de 50 caracteres.');
      return;
    }

    if (!this.validateISBN(this.isbn)) {
      alert('El campo ISBN debe tener la estructura válida de un ISBN.');
      return;
    }

    if (this.ejemplares === null) {
      alert('El campo "Número de ejemplares" es obligatorio.');
      return;
    }

    if (this.ejemplares < 0) {
      alert('El "Número de ejemplares" no puede ser menor que cero.');
      return;
    }

    const newBook = {
      isbn: this.isbn,
      titulo: this.nombreLibro,
      autor: this.autor,
      tema: this.tema,
      categoria: this.categoria,
      descripcion: this.informacion,
      numeroEjemplares: this.ejemplares
    };

    this.http.post('http://localhost:3000/addBook', newBook).subscribe(
      response => {
        alert('Libro guardado con éxito');
        this.router.navigate(['/menu']);
      },
      error => {
        console.error('Error durante el registro del libro:', error);
        alert('Error durante el registro del libro');
      }
    );
  }

  validateISBN(isbn: string): boolean {
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(isbn);
  }

  confirmCancel() {
    if (confirm('¿Estás seguro de cancelar el registro?')) {
      this.router.navigate(['/menu']);
    }
  }
}
