import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent {

  name$:Observable<string |  undefined>= this.auth.user$.pipe(map(User => User?.name))

  constructor(@Inject(DOCUMENT) public document: Document,public auth: AuthService){

  }
}
