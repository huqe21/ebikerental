import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import {GoogleMapsModule} from '@angular/google-maps'



@NgModule({
  declarations: [
    GooglemapsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  exports:[GooglemapsComponent]

})
export class MapsModule { }
