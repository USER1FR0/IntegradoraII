import { Component, OnInit } from '@angular/core';
import { LectorService } from './../../Services/lector.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-lector',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.componen.css']
})
export class RegistroLectorComponent implements OnInit {
  lector = {
    NombreCompleto: '',
    NumeroControl: '',
    Correo: ''
  };
  lectores: any[] = []; // Lista de lectores
  showLectoresList = false; // Controla la visibilidad de la lista de lectores
  errorMessage: string = ''; // Error message en caso de que los campos estén vacíos
  editMode: boolean = false; // Controla si estamos editando un lector
  selectedLector: any; // Lector seleccionado para editar

  constructor(private lectorService: LectorService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadLectores(); // Cargar los lectores al iniciar el componente
  }

  // Registrar un nuevo lector
  onSubmit() {
    if (this.lector.NombreCompleto && this.lector.NumeroControl && this.lector.Correo) {
      if (this.editMode && this.selectedLector) {
        // Si estamos editando un lector, actualizar
        this.updateLector();
      } else {
        // Si estamos registrando un nuevo lector
        this.addLector();
      }

    } else {
      this.errorMessage = 'Todos los campos son obligatorios';
    }
  }

  // Agregar un nuevo lector
  addLector() {
    this.lectorService.addLector(this.lector).subscribe({
      next: () => {
        this.snackBar.open('Lector registrado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadLectores(); // Recargar la lista de lectores después del registro
        this.resetFields(); // Limpiar los campos
      },
      error: (error) => {
        this.snackBar.open('Error al registrar el lector', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al registrar el lector', error);
      }
    });
  }

  // Actualizar un lector
  updateLector() {
    this.lectorService.updateLector(this.selectedLector.id, this.lector).subscribe({
      next: () => {
        this.snackBar.open('Lector actualizado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadLectores(); // Recargar la lista de lectores
        this.resetFields(); // Limpiar los campos
        this.editMode = false; // Desactivar el modo de edición
      },
      error: (error) => {
        this.snackBar.open('Error al actualizar el lector', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al actualizar el lector', error);
      }
    });
  }

  // Cargar los lectores desde el servicio
  loadLectores() {
    this.lectorService.searchLectores({}).subscribe({
      next: (response) => {
        this.lectores = response;
      },
      error: (error) => {
        console.error('Error al cargar los lectores', error);
        this.snackBar.open('Error al cargar los lectores', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  // Mostrar u ocultar la lista de lectores
  toggleLectoresList() {
    this.showLectoresList = !this.showLectoresList;
  }

  // Seleccionar un lector para editar
  editLector(lector: any) {
    this.editMode = true;
    this.selectedLector = lector;
    this.lector = { ...lector }; // Copiar los valores del lector seleccionado al formulario
  }

  // Eliminar un lector
  deleteLector(id: number) {
    this.lectorService.deleteLector(id).subscribe({
      next: () => {
        this.snackBar.open('Lector eliminado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadLectores(); // Recargar la lista de lectores
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar el lector', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al eliminar el lector', error);
      }
    });
  }

  // Restablecer los campos del formulario
  resetFields() {
    this.lector.NombreCompleto = '';
    this.lector.NumeroControl = '';
    this.lector.Correo = '';
  }
}
