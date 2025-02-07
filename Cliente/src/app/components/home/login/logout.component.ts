import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired-dialog',
  template: `
    <h1 mat-dialog-title class="dialog-title">Sesión Expirada</h1>
    <div mat-dialog-content class="dialog-content">
      <mat-icon class="dialog-icon">access_time</mat-icon>
      <p class="dialog-message">Tu sesión ha expirado. Por razones de seguridad, necesitarás iniciar sesión nuevamente para continuar.</p>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-raised-button color="primary" (click)="close()">Aceptar</button>
    </div>
  `,
  styles: [
    `
      .dialog-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      .dialog-content {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #555;
        margin-top: 10px;
      }
      .dialog-icon {
        margin-right: 15px;
        color: #ff3d00;
        font-size: 32px;
      }
      .dialog-message {
        margin: 0;
        max-width: 350px;
      }
      .dialog-actions {
        justify-content: flex-end;
        padding: 10px;
      }
    `
  ]
})
export class SessionExpiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<SessionExpiredDialogComponent>) {}

  close() {
    this.dialogRef.close(); // Cierra el diálogo
  }
}
