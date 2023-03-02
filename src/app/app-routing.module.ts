import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapsComponent } from './components/maps/googlemaps/googlemaps.component';
import { StationViewComponent } from './components/station-view/station-view.component';
import { RentComponent } from './components/rent/rent.component';
import { SuccessComponent } from './components/success/success.component';
import { ReturnComponent } from './components/return/return.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: 'station', component: StationViewComponent},
  {path: 'ausleihen', component: GooglemapsComponent},
  {path: 'checkout', component: RentComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'return', component: ReturnComponent},
  {path: 'about-us', component: AboutComponent},
  {path: '', component: HomeComponent},
  {path: '*', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
