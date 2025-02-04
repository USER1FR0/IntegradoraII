import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired-dialog',
  template: `
    <h1 mat-dialog-title>Sesión expirada</h1>
    <div mat-dialog-content>
      <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="blue" (click)="close()">Aceptar</button>
    </div>
  `,
})
export class SessionExpiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<SessionExpiredDialogComponent>) {}

  close() {
    this.dialogRef.close(); // Cierra el diálogo
  }
}
