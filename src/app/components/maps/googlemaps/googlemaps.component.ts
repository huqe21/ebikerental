import { AfterViewInit, Component } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { DataService } from 'src/app/services/data.service';
import {} from '@angular/google-maps';
import { Station } from 'src/app/models/station.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements AfterViewInit{

  zoom!: number;
  center!: google.maps.LatLng;
  options!: google.maps.MapOptions;
  constructor(public dataService: DataService, private router: Router){
    dataService.station$.subscribe(console.log)
  }
  ngAfterViewInit(): void {
    this.zoom = 15;
    this.center= this.createLatLng(49.488160, 8.465841 );
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
          east: 8.56,
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

  createLatLng(p1:number, p2:number): google.maps.LatLng{
    return new google.maps.LatLng(p1,p2);
  }

  getStationText(station: Station): string{
    return(station.name," ", "Anzahl verfügbarer E-Bikes: ", station.countOfBikes.toString())
  }
  
  goToStation(station: Station){
    this.router.navigate(['station/',station.id]);
  }


}
