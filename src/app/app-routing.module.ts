import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapsComponent } from './components/maps/googlemaps/googlemaps.component';
import { StationViewComponent } from './components/station-view/station-view.component';
import { RentComponent } from './components/rent/rent.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  {path: 'station', component: StationViewComponent},
  {path: 'ausleihen', component: RentComponent},
  {path: 'success', component: SuccessComponent},
  {path: '', component: GooglemapsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
