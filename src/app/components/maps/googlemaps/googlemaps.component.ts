import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent {

  zoom: number;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;
  constructor(public dataService: DataService){
    this.zoom = 15;
    this.center= { lat: 49.488160, lng: 8.465841}
    this.options  = {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      maxZoom: 17,
      minZoom: 10,
      disableDefaultUI: true,
      restriction: {
        latLngBounds: {
          east: 8.53,
          north: 49.52,
          south: 49.44,
          west: 8.43
        },
        strictBounds: true
      },
      clickableIcons:false,
      styles: [   {     "elementType": "labels",     "stylers": [       {         "visibility": "off"       }     ]   },   {     "featureType": "administrative.land_parcel",     "stylers": [       {         "visibility": "off"       }     ]   }
      ,{
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },   ]

    };
  }
}
