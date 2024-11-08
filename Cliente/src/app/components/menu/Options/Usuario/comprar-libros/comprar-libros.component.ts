import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../../Services/books.services';
import { SearchService } from '../../../../Services/search.service';
declare var bootstrap: any;

@Component({
  selector: 'app-comprar-libros',
  templateUrl: './comprar-libros.component.html',
  styleUrls: ['./comprar-libros.component.css']
})
export class ComprarLibrosComponent implements OnInit {
  activeTab:string='library';
  books: any[] = [];
  customSearchResults: any[] = [];
  searchTerm: string = '';
  searchTermCustom: string = '';
  selectedBook: any = null;
  isLoadingBooks: boolean = false;
  isLoadingCustom: boolean = false;
  booksError: string = '';
  customSearchError: string = '';

  constructor(
    private booksService: BooksService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  // Método para buscar libros en la API de Google Books
  searchBooks(): void {
    if (this.searchTerm) {
      this.isLoadingBooks = true;
      this.booksError = '';
      this.booksService.getBooks(this.searchTerm).subscribe(
        (data) => {
          this.books = data;
          this.isLoadingBooks = false;
        },
        (error) => {
          console.error('Error al obtener los libros:', error);
          this.booksError = 'Hubo un problema al cargar los resultados de la búsqueda.';
          this.isLoadingBooks = false;
        }
      );
    }
  }

  // Método para buscar en Google Custom Search API
  searchCustom(): void {
    if (this.searchTermCustom) {
      this.isLoadingCustom = true;
      this.customSearchError = '';
      this.searchService.search(this.searchTermCustom).subscribe(
        (data) => {
          this.customSearchResults = data.items || [];
          this.isLoadingCustom = false;
        },
        (error) => {
          console.error('Error en la búsqueda personalizada:', error);
          this.customSearchError = 'Hubo un problema al cargar los resultados de la búsqueda.';
          this.isLoadingCustom = false;
        }
      );
    }
  }

  // Método para abrir el modal con los detalles del libro
  openModal(book: any): void {
    this.selectedBook = book;
    const modalElement = document.getElementById('bookModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
