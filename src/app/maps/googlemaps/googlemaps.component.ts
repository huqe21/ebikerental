import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent {

  zoom: number;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;

  constructor(){
    this.zoom = 15;
    this.center= { lat: 49.488160, lng: 8.465841}
    this.options  = {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      maxZoom: 20,
      minZoom: 14,
      disableDefaultUI: true,
      draggable:false,
      clickableIcons:false,
    };
  }
 
  zoomIn() {
    if (this.zoom < 20) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > 14) this.zoom--;
  }
}
