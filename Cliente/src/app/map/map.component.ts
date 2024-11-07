import { Component, OnInit } from '@angular/core';
import { EventosService } from './../components/Services/eventos.service';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;
  private platform: any;
  private userPosition: any; // Variable para almacenar la ubicación del usuario
  private currentBubble: any; // Variable para almacenar el cuadro de información actual

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.platform = new H.service.Platform({
      apikey: "EA1yweP2Qasi_jTOqeiKhRoBDqnu_Oh_QKiG91e2d38"
    });
    const defaultLayers = this.platform.createDefaultLayers();

    this.map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        zoom: 12,
      }
    );

    const mapEvents = new H.mapevents.MapEvents(this.map);
    new H.mapevents.Behavior(mapEvents);
    H.ui.UI.createDefault(this.map, defaultLayers, "es-ES");

    this.getBrowserPosition(); // Obtener la ubicación del usuario
    this.loadEventos(); // Cargar los eventos y agregarlos al mapa
  }

  // Obtener la posición del usuario y centrar el mapa en ella
  getBrowserPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("Ubicación del usuario:", this.userPosition);

          // Centrar el mapa en la posición del usuario sin agregar marcador
          this.map.setCenter(this.userPosition);
        },
        () => {
          alert("No pudimos obtener su ubicación.");
        }
      );
    } else {
      alert("Geolocation no es soportada por este navegador.");
    }
  }

  // Cargar los eventos activos desde el servicio y agregar "cuadros de texto" como marcadores
  loadEventos(): void {
    this.eventosService.getEventosActivos().subscribe(
      (eventos) => {
        eventos.forEach((evento) => {
          const coordinate = { 
            lat: parseFloat(evento.Latitud.toString()),
            lng: parseFloat(evento.Longitud.toString()) 
          };
          this.addTextMarker(coordinate, evento.NombreEvento, evento.Descripcion, this.formatDate(evento.Fecha));
        });
      },
      (error) => {
        console.error("Error al cargar eventos:", error);
      }
    );
  }

  // Función para formatear la fecha en un formato legible
  formatDate(date: string): string {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Agregar un marcador de texto para cada evento
  addTextMarker(coordinate: any, title: string, description: string, formattedDate: string): void {
    const smallContent = `<b>${title}</b>`;
    const fullContent = `<b>${title}</b><br>${description}<br><i>Fecha: ${formattedDate}</i>`;

    const marker = new H.map.DomMarker(coordinate, {
      icon: this.createTextIcon(smallContent)
    });
    this.map.addObject(marker);

    // Agregar evento para expandir al hacer clic
    marker.addEventListener('tap', () => {
      marker.setIcon(this.createTextIcon(fullContent)); // Cambiar a la vista expandida
    });

    // Regresar al cuadro pequeño cuando el puntero se retira del cuadro
    marker.addEventListener('pointerleave', () => {
      marker.setIcon(this.createTextIcon(smallContent)); // Cambiar de nuevo a la vista compacta
    });
  }

  // Crear un ícono de texto personalizado
  createTextIcon(content: string): any {
    const div = document.createElement('div');
    div.style.fontSize = '14px';
    div.style.padding = '8px';
    div.style.borderRadius = '8px';
    div.style.backgroundColor = 'blue';
    div.style.color = 'white';
    div.style.border = '1px solid #ddd';
    div.style.maxWidth = '200px';
    div.style.cursor = 'pointer';
    div.style.textAlign = 'center';
    div.innerHTML = content;

    // Crear el ícono de texto
    return new H.map.DomIcon(div);
  }
}
