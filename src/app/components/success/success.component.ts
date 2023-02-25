import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
  options!: google.maps.MapOptions;

  constructor(public dataService: DataService, private activeRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.options = {
      draggable: false,
      mapTypeId: 'hybrid',
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
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

  getBikeID(): string {
    let activeBike: string = '';
    this.activeRoute.queryParamMap.subscribe(params => activeBike = params.get('bike') || '')
    return activeBike;
  }
  getStationID(): string {
    let station: string = '';
    this.activeRoute.queryParamMap.subscribe(params => station = params.get('station') || '');
    return station;

  }

}
