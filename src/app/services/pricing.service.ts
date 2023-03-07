import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Bike } from '../models/bike.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private dataService: DataService) {
  }

  public getPrice(bike: Bike):string {
   if(bike.premium==1)
   {
    return "0.15";
   }
   else
   {
    return "0.10";
   }
  }
} 