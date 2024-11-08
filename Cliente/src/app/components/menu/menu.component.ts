import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from './Options/Services/sidebar.services';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatbaseService } from './Options/Services/chatbot.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isSidebarHidden = false;
  showSearch = false;
  showNewBooks = false;
  showMultas = false;
  showRegistro = false;
  isDropdownVisible = false;
  showLectores = false;
  showReporte = false;
  isFooterVisible = false;
  comprarLibros = false;
  pagarMultas = false;

  eventos = false;
  llamada = false;
  showNoticias = true; // Inicialmente mostramos las noticias
  showDevolucionDeLibros = false; // Asegúrate de que esta propiedad esté definida
  noticiasItems: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private http: HttpClient,
    private router: Router,
    private chatbaseService: ChatbaseService // Inyecta el servicio del chatbot
  ) {
    this.sidebarService.sidebarHidden$.subscribe(hidden => this.isSidebarHidden = hidden);
    this.cargarNoticias();
  }

  ngOnInit() {
    this.chatbaseService.loadChatbot(); // Llama a loadChatbot cuando el componente se inicializa
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  showSearchBooks() {
    this.resetViews();
    this.showSearch = true;
  }

  showLlamada(){
    this.resetViews();
    this.llamada = true;
  }

  showNewBook() {
    this.resetViews();
    this.showNewBooks = true;
  }

  showMulta() {
    this.resetViews();
    this.showMultas = true;
  }

  showRegistroBlibliotecarios() {
    this.resetViews();
    this.showRegistro = true;
  }

  showRegistroLectores() {
    this.resetViews();
    this.showLectores = true;
  }

  showPersonalisado() {
    this.resetViews();
    this.showReporte = true;
  }

  comprarLibro() {
    this.resetViews();
    this.comprarLibros = true;
  }

  pagarMulta() {
    this.resetViews();
    this.pagarMultas = true;
  }

  showEventos(){
    this.resetViews();
    this.eventos = true;
  }
  showNoticiasSection() {
    this.resetViews();
    this.showNoticias = true;
  }

  mostrarDevolucionDeLibros() {
    this.resetViews();
    this.showDevolucionDeLibros = true;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  private resetViews() {
    this.showSearch = false;
    this.showNewBooks = false;
    this.showMultas = false;
    this.showRegistro = false;
    this.showLectores = false;
    this.showReporte = false;
    this.showNoticias = false;
    this.comprarLibros = false;
    this.pagarMultas = false;

    this.eventos = false;
    this.showDevolucionDeLibros = false; // Resetea la propiedad de devolución de libros
    this.llamada=false;
    this.llamada=false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.clientHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    this.isFooterVisible = windowBottom >= docHeight;
  }

  private cargarNoticias() {
    this.noticiasItems = [
      {
        titulo: "Nueva colección de libros clásicos",
        contenido: "La biblioteca ha adquirido una colección completa de obras clásicas de la literatura universal.",
        imagen: "https://th.bing.com/th/id/R.366ae01b84a07de654d63ff8d003e6e9?rik=KNu3PH45d08DIQ&pid=ImgRaw&r=0"
      },
      {
        titulo: "Taller de escritura creativa",
        contenido: "Este mes iniciamos un taller gratuito de escritura creativa para todos los miembros de la biblioteca.",
        imagen: "https://th.bing.com/th/id/OIP.9xsLdr8m03Ef9T9VErpbhQHaJv?rs=1&pid=ImgDetMain"
      },
      {
        titulo: "Ampliación del horario de apertura",
        contenido: "A partir del próximo mes, la biblioteca estará abierta hasta las 22:00 horas de lunes a viernes.",
        imagen: "https://diarioeducacion.com/wp-content/uploads/2023/06/NUEVOS-LIBROS-DE-TXTOS-2024-205-PRIMER-GRADO.jpg"
      }
    ];
  }
}
