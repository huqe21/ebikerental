import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { MapsModule } from './maps/maps.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    MapsModule,
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
