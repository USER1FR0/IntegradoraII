import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Correcto para las animaciones
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Correcto para importar HTTP_INTERCEPTORS
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí para usar ngModel
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './components/menu/Options/Administrador/search-books/SearchBooks.component';
import { NewBooksComponent } from './components/menu/Options/Administrador/NewBooks/NewBooks.component';
import { EditBooksComponent } from './components/menu/Options/Administrador/EditBooks/EditBooks.component';
import { ConfirmacionDeEmailComponent } from './components/menu/Options/Administrador/confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/menu/Options/Administrador/multas/multas.component';
import { RegistroBibiotecariosComponent } from './components/menu/Options/Administrador/RegistroBibliotecarios/bibliotecarios.component';
import { RegistroLectorComponent } from './components/menu/Options/Administrador/Lectores/lectores.component';
import { PersonalisadoComponent } from './components/menu/Options/Administrador/ReportePersonalisado/personalisados.component';
import { ErrorComponent } from './components/home/error/error.component';
import { DevolucionDeLibrosComponent } from './components/menu/Options/Administrador/devolucion-de-libros/devolucion-de-libros.component';
import { ipComponent } from './components/menu/Options/Administrador/ip/ip.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { PagarMultasComponent } from './components/menu/Options/Usuario/pagar-multas/pagar-multas.component';
import { ComprarLibrosComponent } from './components/menu/Options/Usuario/comprar-libros/comprar-libros.component';
import { EventosComponent } from './components/menu/Options/Administrador/eventos/eventos.component';
import { PaypalComponent } from './components/menu/Options/Usuario/paypal/paypal.component';
import { VideollamadaComponent } from './components/menu/Options/Administrador/videollamada/videollamada.component';
import { AuthInterceptor } from './auth.interceptor';
import { SessionExpiredDialogComponent } from './components/home/login/logout.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    SearchBooksComponent,
    NewBooksComponent,
    EditBooksComponent,
    ConfirmacionDeEmailComponent,
    MultasComponent,
    RegistroLectorComponent,
    PersonalisadoComponent,
    ErrorComponent,
    DevolucionDeLibrosComponent,
    ipComponent,
    MapComponent,
    PagarMultasComponent,
    ComprarLibrosComponent,
    EventosComponent,
    PaypalComponent,
    VideollamadaComponent,
    SessionExpiredDialogComponent,
    RegistroBibiotecariosComponent, // Asegúrate de que tu componente está aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Importa FormsModule aquí para usar ngModel
    BrowserAnimationsModule, // Correcto para las animaciones
    MaterialModule,
    MatIconModule,  // Asegúrate de que este módulo esté aquí
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    LeafletModule, // Asegúrate de que el módulo de Leaflet también esté importado si lo usas
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Asegúrate de que el interceptor de autenticación esté en el provider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
