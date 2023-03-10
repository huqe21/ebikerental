import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Station } from 'src/app/models/station.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  public currentStation$: Observable<Station> = this.dataService.station$.pipe(map(stations => {
    console.log(stations);
        console.log(this.selectedStation)
    stations.forEach(station => {
      if (station.id == this.selectedStation) {
        console.log(station);
        console.log(this.selectedStation)
        this.finalstation = station;
      }
    });
    return this.finalstation;
  }));
  zoom: number = 16;
  finalstation!: Station;
  defaultZoom: number = 15;
  stations?: Array<Station>;
  selectedStation!: number;
  options!: google.maps.MapOptions;
  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };

  returnBike(stationID: number, bikeID: number): void {
    const temp = this.dataService.returnBike(bikeID, stationID).subscribe();
    this.router.navigate(['return-success'], { queryParams: { bikeID: bikeID, stationID: stationID } });
    temp.unsubscribe();

  }

  constructor(public dataService: DataService, private router: Router) {
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
