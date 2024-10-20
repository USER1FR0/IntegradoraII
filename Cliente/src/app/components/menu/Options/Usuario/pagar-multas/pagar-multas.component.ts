import { Component, OnInit } from '@angular/core';
import { MultasService } from '../../Services/multa.service';

@Component({
  selector: 'app-pagar-multas',
  templateUrl: './pagar-multas.component.html',
  styleUrl: './pagar-multas.component.css'
})
export class PagarMultasComponent implements OnInit {
  multasPendientes: any[] = [];
  numeroControlInput: string | null = null;  // Variable para almacenar el número de control ingresado por el lector
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private multasService: MultasService) { }

  ngOnInit(): void { }

  loadMultasPendientes(): void {
    if (!this.numeroControlInput) return;

    this.multasService.getMultas().subscribe({
      next: (data) => {
        // Filtrar multas pendientes del lector según el número de control ingresado
        this.multasPendientes = data.filter((multa: any) =>
          multa.NumeroControl === this.numeroControlInput && multa.Estatus === 'Activa'
        );
      },
      error: error => {
        console.error('Error al cargar las multas:', error);
      }
    });
  }

  pagarMulta(multa: any): void {
    multa.Estatus = 'Pagada';  // Cambiar estatus a 'Pagada'

    this.multasService.updateMulta(multa.IdMulta, multa).subscribe({
      next: () => {
        this.showAlert('Multa pagada exitosamente', 'success');
        this.loadMultasPendientes();  // Recargar la lista de multas pendientes
      },
      error: error => {
        console.error('Error al pagar la multa:', error);
        this.showAlert('Error al pagar la multa', 'error');
      }
    });
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }
}
