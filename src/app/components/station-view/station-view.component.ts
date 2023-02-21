import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.scss']
})
export class StationViewComponent {
  constructor(private router: Router) { }

  public goBack() {
    this.router.navigate(['']);
  }
}
