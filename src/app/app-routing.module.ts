import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapsComponent } from './components/maps/googlemaps/googlemaps.component';
import { StationViewComponent } from './components/station-view/station-view.component';

const routes: Routes = [
  {path: '', component: GooglemapsComponent},
  {path: 'station/1', component: StationViewComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
