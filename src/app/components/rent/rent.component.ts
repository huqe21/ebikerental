import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from 'src/app/models/station.model';
import { DataService } from 'src/app/services/data.service';
import { PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit{
  private activeBike: string= '';
  private stations:Station[]= new Array<Station>();
  public aFormGroup: FormGroup;
  public robot: boolean = false;
  constructor(private router: Router, private activeRoute: ActivatedRoute, public dataService: DataService, public pricingService: PricingService, public formBuilder: FormBuilder) {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
   }
  ngOnInit(): void {
    
  }

  
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
    this.dataService.rentBike(this.getCurrentBikeID()).subscribe();
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
  
