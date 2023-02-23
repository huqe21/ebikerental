import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bike } from 'src/app/models/bike.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.scss']
})
export class StationViewComponent {
  private activeStation: string= '';
  constructor(private router: Router, private activeRoute: ActivatedRoute, public dataService: DataService) { }
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
    this.router.navigate(['ausleihen'], {queryParams:{id:bike.id, station:this.getCurrentStationID()}})
  }
}
