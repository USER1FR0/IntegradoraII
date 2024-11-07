import { Component, OnInit } from '@angular/core';
import { MultasService } from '../../Services/multa.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pagar-multas',
  templateUrl: './pagar-multas.component.html',
  styleUrls: ['./pagar-multas.component.css']
})
export class PagarMultasComponent implements OnInit {
  multasPendientes: any[] = [];
  numeroControlInput: string | null = null;
  multaSeleccionada: any | null = null;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';
  recibo: any | null = null; // Para almacenar el recibo generado

  constructor(private multasService: MultasService) { }

  ngOnInit(): void { }

  loadMultasPendientes(): void {
    if (!this.numeroControlInput) return;

    this.multasService.getMultas().subscribe({
      next: (data) => {
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
    this.multaSeleccionada = multa;
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }

  onPagoCompletado(event: any): void {
    const { multa, detallesPago } = event;
    this.multaSeleccionada.Estatus = 'Pagada';
    this.recibo = {
      id: detallesPago.id,
      monto: multa.Monto,
      fecha: new Date().toLocaleString(),
      idMulta: multa.IdMulta,
      detallesPago
    };
    this.showAlert('Pago completado exitosamente', 'success');
    this.actualizarMulta(multa.IdMulta);  // Actualizar estado en la base de datos
    this.generarReciboPDF();              // Generar y descargar el PDF
    this.loadMultasPendientes(); // Load the multas pendientes
  }

  actualizarMulta(idMulta: number): void {
    this.multasService.updateMultaPago(idMulta, { Estatus: 'Pagada' }).subscribe({
      next: () => this.showAlert('Estado de multa actualizado a Pagada', 'success'),
      error: (error) => console.error('Error al actualizar la multa:', error)
    });
  }

  generarReciboPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Recibo de Pago', 20, 20);

    doc.setFontSize(12);
    doc.text(`ID de Pago: ${this.recibo.id}`, 20, 40);
    doc.text(`ID de Multa: ${this.recibo.idMulta}`, 20, 50);
    doc.text(`Monto Pagado: $${this.recibo.monto}`, 20, 60);
    doc.text(`Fecha de Pago: ${this.recibo.fecha}`, 20, 70);

    doc.text('Detalles del Pago:', 20, 90);
    doc.text(`Estado: ${this.recibo.detallesPago.status}`, 20, 100);
    doc.text(`Payee Email: ${this.recibo.detallesPago.purchase_units[0].payee.email_address}`, 20, 110);

    doc.save('recibo_pago.pdf'); // Descargar el PDF
  }
}
