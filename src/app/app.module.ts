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
import { SuccessComponent } from './components/success/success.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReturnComponent } from './components/return/return.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PushModule, LetModule } from '@ngrx/component';
import { ReturnSuccessComponent } from './components/return-success/return-success.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    StationViewComponent,
    RentComponent,
    SuccessComponent,
    ReturnComponent,
    HomeComponent,
    AboutComponent,
    ReturnSuccessComponent,
  ],
  imports: [
    BrowserModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule,
    LetModule,
    GoogleMapsModule,
    MapsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: '',
      clientId: '',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
