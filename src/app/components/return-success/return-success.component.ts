import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapStyle } from 'src/app/const/mapStyle';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-return-success',
  templateUrl: './return-success.component.html',
  styleUrls: ['./return-success.component.scss']
})
export class ReturnSuccessComponent {
  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
  options!: google.maps.MapOptions;

  constructor(public dataService: DataService, private activeRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.options = {
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
      clickableIcons: false,
      styles: mapStyle

    };
  }

  createLatLng(p1: number, p2: number): google.maps.LatLng {
    return new google.maps.LatLng(p1, p2);
  }

  getBikeID(): string {
    let activeBike: string = '';
    let temp=this.activeRoute.queryParamMap.subscribe(params => activeBike = params.get('bikeID') || '')
    temp.unsubscribe();
    return activeBike;
  }
  getStationID(): string {
    let station: string = '';
    let temp=this.activeRoute.queryParamMap.subscribe(params => station = params.get('stationID') || '');
    temp.unsubscribe();
    return station;

  }

}
