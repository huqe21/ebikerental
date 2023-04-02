import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { mapStyle } from 'src/app/const/mapStyle';
import { Station } from 'src/app/models/station.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  public aFormGroup: FormGroup;
  stationFull: boolean = false;
  zoom: number = 16;
  finalstation!: Station;
  defaultZoom: number = 15;
  stations?: Array<Station>;
  selectedStation!: number;
  options!: google.maps.MapOptions;
  robot: boolean = false;
  markerIcon = { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };

  returnBike(stationID: number, bikeID: number): void {
    const temp = this.dataService.returnBike(bikeID, stationID).subscribe(val => {
      this.router.navigate(['return-success'], { queryParams: { bikeID: bikeID, stationID: stationID, price: val.value } });
    });
    
    // temp.unsubscribe();;

  }

  checkStation(station: Station){
    if(station.countOfBikes==station.maxCountOfBikes)
    {
      this.stationFull=true;
    }
    else{
      this.stationFull=false;
    }
  }

  constructor(public dataService: DataService, public router: Router, public formBuilder: FormBuilder) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataService.station$.subscribe(val => this.stations = val);
    this.options = {
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
      styles: mapStyle

    };
  }

  createLatLng(p1: number, p2: number): google.maps.LatLng {
    return new google.maps.LatLng(p1, p2);
  }
  getMarker(station: Station){
    if(station.countOfBikes===station.maxCountOfBikes){
      return { url: "assets/marker_red.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
    
    }
    return { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
  }
}
