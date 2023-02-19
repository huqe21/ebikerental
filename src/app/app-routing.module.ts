import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapsComponent } from './components/maps/googlemaps/googlemaps.component';

const routes: Routes = [
  {path: '', component: GooglemapsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
