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
  private userPosition: any;
  private routingService: any;
  private routeLine: any;
  private userMarker: any;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.platform = new H.service.Platform({
      apikey: "EA1yweP2Qasi_jTOqeiKhRoBDqnu_Oh_QKiG91e2d38"
    });
    const defaultLayers = this.platform.createDefaultLayers();
    this.routingService = this.platform.getRoutingService(null, 8);

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

    this.getBrowserPosition();
    this.loadEventos();
  }

  getBrowserPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.addUserMarker(this.userPosition);
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

  addUserMarker(position: any): void {
    const userIcon = new H.map.Icon(
      'https://upload.wikimedia.org/wikipedia/commons/e/e4/Red_dot.svg',
      { size: { w: 32, h: 32 } }
    );
    this.userMarker = new H.map.Marker(position, { icon: this.userMarker });
    this.map.addObject(this.userMarker);
  }

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

  formatDate(date: string): string {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("es-ES", { day: 'numeric', month: 'long', year: 'numeric' });
  }

  addTextMarker(coordinate: any, title: string, description: string, formattedDate: string): void {
    const smallContent = `<b>${title}</b>`;
    const fullContent = `
      <b>${title}</b><br>${description}<br><i>Fecha: ${formattedDate}</i>
      <br><button onclick="document.dispatchEvent(new CustomEvent('routeToEvent', { detail: ${JSON.stringify(coordinate)} }))">Ir</button>
    `;

    const marker = new H.map.DomMarker(coordinate, {
      icon: this.createTextIcon(smallContent)
    });
    this.map.addObject(marker);

    marker.addEventListener('tap', () => {
      marker.setIcon(this.createTextIcon(fullContent));
    });

    marker.addEventListener('pointerleave', () => {
      marker.setIcon(this.createTextIcon(smallContent));
    });

    // Escuchar el evento "routeToEvent" y calcular la ruta
    document.addEventListener('routeToEvent', (e: any) => {
      this.calculateRoute(this.userPosition, e.detail);
    });
  }

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
    return new H.map.DomIcon(div);
  }

  calculateRoute(origin: any, destination: any): void {
    if (this.routeLine) {
      this.map.removeObject(this.routeLine); // Remove previous route if it exists
    }

    const routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      return: "polyline"
    };

    this.routingService.calculateRoute(routingParameters, (result: any) => {
      if (result.routes.length) {
        const route = result.routes[0];
        route.sections.forEach((section: any) => {
          const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
          this.routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: "#034F84", lineWidth: 3 }
          });
          this.map.addObject(this.routeLine);
          this.map.getViewModel().setLookAtData({ bounds: this.routeLine.getBoundingBox() });
        });
      }
    }, (error: any) => {
      alert("Error al calcular la ruta: " + error.message);
    });
  }
}
