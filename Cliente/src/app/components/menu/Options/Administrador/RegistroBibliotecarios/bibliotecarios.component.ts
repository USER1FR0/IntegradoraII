import { Component, OnInit } from '@angular/core';
import { BibliotecarioService } from './../../Services/bibliotecario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bibliotecarios',
  templateUrl: './bibliotecarios.component.html',
  styleUrls: ['./Registro.component.css']
})
export class RegistroBibiotecariosComponent implements OnInit {
  NombreCompleto: string = '';
  Correo: string = '';
  Telefono: string = '';
  NombreUsuario: string = '';
  Contrasena: string = '';
  bibliotecarios: any[] = []; // Lista de bibliotecarios
  editMode: boolean = false; // Para saber si estamos en modo edición
  selectedBibliotecario: any; // Bibliotecario seleccionado para edición
  showBibliotecarios: boolean = false; // Controla la visibilidad de la tabla

  constructor(private bibliotecarioService: BibliotecarioService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadBibliotecarios();
  }

  // Cargar todos los bibliotecarios
  loadBibliotecarios() {
    this.bibliotecarioService.getBibliotecarios().subscribe({
      next: (response) => {
        this.bibliotecarios = response;
      },
      error: (error) => {
        console.error('Error al cargar bibliotecarios', error);
        this.snackBar.open('Error al cargar bibliotecarios', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Guardar nuevo bibliotecario o actualizar existente
  saveBibliotecario() {
    if (this.validateInput()) {
      const bibliotecarioData = {
        NombreCompleto: this.NombreCompleto,
        Correo: this.Correo,
        Telefono: this.Telefono,
        NombreUsuario: this.NombreUsuario,
        Contrasena: this.Contrasena
      };

      if (this.editMode && this.selectedBibliotecario) {
        // Actualizar bibliotecario
        this.bibliotecarioService.updateBibliotecario(this.selectedBibliotecario.id, bibliotecarioData).subscribe({
          next: () => {
            this.snackBar.open('Bibliotecario actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.resetFields();
            this.loadBibliotecarios(); // Recargar la lista de bibliotecarios
            this.editMode = false;
          },
          error: (error) => {
            this.snackBar.open('Error al actualizar bibliotecario', 'Cerrar', { duration: 3000 });
            console.error('Error al actualizar bibliotecario', error);
          }
        });
      } else {
        // Crear nuevo bibliotecario
        this.bibliotecarioService.addBibliotecario(bibliotecarioData).subscribe({
          next: () => {
            this.snackBar.open('Bibliotecario registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.resetFields();
            this.loadBibliotecarios(); // Recargar la lista de bibliotecarios
          },
          error: (error) => {
            this.snackBar.open('Error al registrar bibliotecario', 'Cerrar', { duration: 3000 });
            console.error('Error al registrar bibliotecario', error);
          }
        });
      }
    }
  }

  // Seleccionar un bibliotecario para editar
  editBibliotecario(bibliotecario: any) {
    this.editMode = true;
    this.selectedBibliotecario = bibliotecario;
    this.NombreCompleto = bibliotecario.NombreCompleto;
    this.Correo = bibliotecario.Correo;
    this.Telefono = bibliotecario.Telefono;
    this.NombreUsuario = bibliotecario.NombreUsuario;
    this.Contrasena = bibliotecario.Contrasena;
  }

  // Eliminar un bibliotecario
  deleteBibliotecario(id: number) {
    this.bibliotecarioService.deleteBibliotecario(id).subscribe({
      next: () => {
        this.snackBar.open('Bibliotecario eliminado exitosamente', 'Cerrar', { duration: 3000 });
        this.loadBibliotecarios(); // Recargar la lista de bibliotecarios
      },
      error: (error) => {
        this.snackBar.open('Error al eliminar bibliotecario', 'Cerrar', { duration: 3000 });
        console.error('Error al eliminar bibliotecario', error);
      }
    });
  }

  // Restablecer los campos del formulario
  resetFields() {
    this.NombreCompleto = '';
    this.Telefono = '';
    this.Contrasena = '';
    this.Correo = '';
    this.NombreUsuario = '';
  }

  // Validar los campos del formulario
  validateInput(): boolean {
    if (!this.NombreCompleto || !this.Correo || !this.Telefono || !this.NombreUsuario || !this.Contrasena) {
      this.snackBar.open('Por favor complete todos los campos', 'Cerrar', { duration: 3000 });
      return false;
    }
    return true;
  }

  // Controlar la visibilidad de la tabla
  toggleBibliotecarios() {
    this.showBibliotecarios = !this.showBibliotecarios;
  }
}
