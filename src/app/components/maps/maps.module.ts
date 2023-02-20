import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import {GoogleMapsModule} from '@angular/google-maps'
import { PushModule} from '@ngrx/component'


@NgModule({
  declarations: [
    GooglemapsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    PushModule,
  ],
  exports:[GooglemapsComponent]

})
export class MapsModule { }
