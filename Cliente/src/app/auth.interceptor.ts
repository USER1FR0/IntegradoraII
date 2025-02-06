import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './components/menu/Options/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionExpiredDialogComponent } from './components/home/login/logout.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 403 && error.error.message === 'Token expirado') {
          // Mostrar diálogo de sesión expirada
          this.dialog.open(SessionExpiredDialogComponent, {
            disableClose: true, // Evita que se cierre haciendo clic fuera del diálogo
          }).afterClosed().subscribe(() => {
            this.authService.logout(); // Llama al método de logout
            this.router.navigate(['/home']); // Redirige a la pantalla de inicio
          });
        }
        return throwError(error);
      })
    );
  }
}
