import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { Bike } from 'src/app/models/bike.model';
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
    this.router.navigate(['']);
  }

  public ausleihen(bike: Bike)
  {
    this.router.navigate(['checkout'], {queryParams:{id:bike.id, station:this.getCurrentStationID()}})
  }
}
