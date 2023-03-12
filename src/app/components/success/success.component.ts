import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
import { DataService } from 'src/app/services/data.service';
import { PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
  options!: google.maps.MapOptions;

  constructor(public dataService: DataService, private activeRoute: ActivatedRoute, public pricingService: PricingService) { }

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
    let temp = this.activeRoute.queryParamMap.subscribe(params => activeBike = params.get('bike') || '');
    temp.unsubscribe();
    return activeBike;
  }
  getStationID(): string {
    let station: string = '';
    let temp = this.activeRoute.queryParamMap.subscribe(params => station = params.get('station') || '');
    temp.unsubscribe();
    return station;

  }

  getBikebyID(id: number): Bike {
    let finalBike: Bike;
    let temp = this.dataService.bike$.pipe(map(bikes => {
      bikes.forEach(bike => {
        if (bike.id == id) {
          finalBike = bike;
        }
      })
    })).subscribe()
    temp.unsubscribe()
    return finalBike!;
  }

}
