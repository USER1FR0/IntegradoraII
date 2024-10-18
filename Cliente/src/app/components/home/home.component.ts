import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IpService } from './../Services/ip.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSearch = false;
  showNewBooks = false;
  showMultas = false;
  showRegistro = false;
  showLectores = false;
  showReporte = false;
  ipInfo: any; 
  // Aquí se guarda la información de la IP del usuario, incluyendo lat/lon

  constructor(private modal: NgbModal, private ipService: IpService) {}

  ngOnInit() {
    // Obtenemos la información de la IP mediante el servicio IpService
    this.ipService.getIpInfo().subscribe(
      data => {
        this.ipInfo = data;
      },
      error => {
        console.error('Error fetching IP info:', error);
      }
    );
  }
  openModal() {
    const modalRef = this.modal.open(LoginComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true
    });
  }
}
