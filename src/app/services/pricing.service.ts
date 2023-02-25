import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private dataService: DataService) { }

public getPrice(bikeID: number){
  return 0;
}
}
