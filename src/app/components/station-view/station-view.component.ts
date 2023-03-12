import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { mapStyle } from 'src/app/const/mapStyle';
import { Bike } from 'src/app/models/bike.model';
import { Station } from 'src/app/models/station.model';
import { DataService } from 'src/app/services/data.service';
import { PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.scss']
})
export class StationViewComponent {
  private activeStation: string= '';
  public userRent$ = this.dataService.user$.pipe(map(user=> { if(user.bike==null){return true;}else{return false;}}))
  constructor(private router: Router, private activeRoute: ActivatedRoute, public dataService: DataService, public pricingService: PricingService) { }
  getCurrentStationID(): number {
    this.activeRoute.queryParamMap.subscribe(params => this.activeStation= params.get('id')||'')
    return +this.activeStation;
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  public goBack() {
    this.router.navigate(['rent']);
  }

  public ausleihen(bike: Bike)
  {
    this.router.navigate(['checkout'], {queryParams:{id:bike.id, station:this.getCurrentStationID()}})
  }

  zoom!: number;
  center!: google.maps.LatLng;
  options!: google.maps.MapOptions;
  ngAfterViewInit(): void {
    this.zoom = 15;
    this.center = this.createLatLng(49.488160, 8.465841);
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

  getStationText(station: Station): string {
    if (station.countOfBikes) {
      return station.countOfBikes.toString();
    }
    else {
      return Number(0).toString();
    }
  }

  getMarker(station: Station){
    if(station.countOfBikes>0){
     return { url: "assets/marker.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
    }
    return { url: "assets/marker_red.png", size: new google.maps.Size(80, 80), scaledSize: new google.maps.Size(80, 80) };
  }

  goToStation(station: Station) {

      this.router.navigate(['station'], { queryParams: { id: station.id } });
    
    
  }
}
