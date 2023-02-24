import { AfterViewInit, Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {} from '@angular/google-maps';
import { Station } from 'src/app/models/station.model';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements AfterViewInit{

  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80,80), scaledSize: new google.maps.Size(80,80)};

  zoom!: number;
  center!: google.maps.LatLng;
  options!: google.maps.MapOptions;
  constructor(public dataService: DataService, private router: Router, private auth: AuthService){
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
          north: 49.50,
          south: 49.46,
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
    if(station.countOfBikes){
      return station.countOfBikes.toString();
    }
    else {
      return Number(0).toString();
    }
  }
  
  goToStation(station: Station){
    let isauth: boolean = false;
    this.auth.isAuthenticated$.subscribe(val => isauth = val);

    if(!isauth){
      this.auth.loginWithRedirect();
    }
    else{
    this.router.navigate(['station'], { queryParams:{id: station.id}});
    }
  }


}
