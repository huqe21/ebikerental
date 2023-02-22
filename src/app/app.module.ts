import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { MapsModule } from './components/maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { StationViewComponent } from './components/station-view/station-view.component';
import { RentComponent } from './components/rent/rent.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    StationViewComponent,
    RentComponent
  ],
  imports: [
    BrowserModule,
    MapsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-jau5d5r7zymxt44k.us.auth0.com',
      clientId: 'H6qwa66sGSg72AeC5JCfoJeR6ADQ0Qhh',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
