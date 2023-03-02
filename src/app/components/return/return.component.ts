import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  zoom: number = 16;
  stations?: Array<Station>;
  selectedStation!: String;
  options!: google.maps.MapOptions;
  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };

  returnBike(station: String): void {
    // Do something with the selected station name, such as return the bike to that station
    console.log(`Bike returned to ${station}`);
  }

  constructor(public dataService: DataService){
  }
  
  ngOnInit(): void {
    this.dataService.station$.subscribe(val => this.stations = val);
    this.options = {
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      maxZoom: 17,
      minZoom: 10,
      disableDefaultUI: true,
      restriction: {
        latLngBounds: {
          east: 8.56,
          north: 49.50,
          south: 49.46,
          west: 8.43
        },
        strictBounds: true
      },
      clickableIcons: false,
      styles: [{ "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] }
        , {
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },]

    };
  }

  createLatLng(p1: number, p2: number): google.maps.LatLng {
    return new google.maps.LatLng(p1, p2);
  }

}
