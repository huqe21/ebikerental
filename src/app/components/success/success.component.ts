import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  constructor(private activeRoute: ActivatedRoute ){}

  getBikeID(): string {
    let activeBike: string = '';
    this.activeRoute.queryParamMap.subscribe(params => activeBike= params.get('bike')||'')
    return activeBike;
  }
  getStationID():string{
      let station: string='';
      this.activeRoute.queryParamMap.subscribe(params => station= params.get('station')||'');
      return station;

    }

}
