import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-Bike Rental';
  constructor(public auth: AuthService, private dataService: DataService){
  }
}
