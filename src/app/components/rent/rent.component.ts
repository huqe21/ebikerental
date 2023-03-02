import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from 'src/app/models/station.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent{
  private activeBike: string= '';
  private stations:Station[]= new Array<Station>();
  constructor(private router: Router, private activeRoute: ActivatedRoute, public dataService: DataService) { }

  
  getCurrentBikeID(): number {
   this.activeRoute.queryParamMap.subscribe(params => this.activeBike= params.get('id')||'');
   
    return +this.activeBike;
  }
  private getFallbackStation():number{
      let station: string='';
      this.activeRoute.queryParamMap.subscribe(params => station= params.get('station')||'');
      return +station;

    }
  public goBack() {
    this.router.navigate(['station'],{queryParams:{station:this.getFallbackStation() }});
  }
  public ausleihen(){
    this.dataService.lentBike(this.getCurrentBikeID());
    this.router.navigate(['success'], {queryParams:{bike: this.getCurrentBikeID(), station: this.getFallbackStation()}})
  }

  public getStandort():string{
    let name: string = '';
    this.dataService.station$.subscribe(station => this.stations= station);
    this.stations.forEach( station =>{if(station.id==this.getFallbackStation()){
      name = station.name;
    }});
    return name;
  }
  
  }
  
