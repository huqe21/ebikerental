import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Bike } from '../models/bike.model';
import { Station } from '../models/station.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL: string = 'http://localhost:80/api/';
  private token: string | undefined;
  private email: string | undefined;

  private userVergleich: Array<User> = new Array<User>;
  private bikeVergleich: Array<Bike> = new Array<Bike>;
  private stationVergleich: Array<Station> = new Array<Station>;

  private user$$: BehaviorSubject<User[]>= new BehaviorSubject(this.userVergleich);
  private bike$$: BehaviorSubject<Bike[]> = new BehaviorSubject(this.bikeVergleich);
  private station$$: BehaviorSubject<Station[]> = new BehaviorSubject(this.stationVergleich);

  public user$: Observable<User[]> = this.user$$.asObservable();
  public bike$: Observable<Bike[]> = this.bike$$.asObservable();
  public station$: Observable<Station[]> = this.station$$.asObservable();

  

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.getBikes().subscribe(bikes => this.bike$$.next(bikes));
    this.getUsers().subscribe(users => this.user$$.next(users));
    this.getStations().subscribe(stations => this.station$$.next(stations));
    this.getEMail();
    this.getToken();
    this.updateObservables();
  }

  private getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + 'get.php/?f=getUser');
  }

  private getBikes(): Observable<Bike[]> {
    return this.httpClient.get<Bike[]>(this.apiURL + 'get.php/?f=getEBike');
  }

  private getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>(this.apiURL + 'get.php/?f=getStation')
  }

  public lentBike(bikeID: number) {
   return this.httpClient.post(this.apiURL+'update.php/?f=lent&email='+this.getEMail()+'&bike='+bikeID,{}).subscribe()
  }

  private getEMail():string | undefined{
    this.auth.user$.pipe(map(user =>{ this.email= user?.email})).subscribe();
    return this.email;
  }

  public returnBike(bikeID:number, stationID:number){
    let email: string | undefined = '';
    this.auth.user$.subscribe(user => email= user?.email)
    this.httpClient.post(this.apiURL+'update.php/?f=returnbike&email='+email+'&bike='+bikeID+'&station=',stationID)
  }

  private getToken(): string | undefined{
    this.auth.idTokenClaims$.pipe(map(token =>  this.token=token?.__raw)).subscribe()
    return this.token;
  }
  private updateObservables() {

    setTimeout(() => {
      this.getStations().subscribe(stations => {
        if (JSON.stringify(stations) != JSON.stringify(this.stationVergleich)) {
          this.station$$.next(stations);
          this.stationVergleich = stations;
        }
      });
    }, 5000)

    setTimeout(() => {
      this.getUsers().subscribe(users => {
        if (JSON.stringify(users) != JSON.stringify(this.userVergleich)) {
          this.userVergleich = users;
          this.user$$.next(users);
        }
      }
      )
    }, 5000)
    setTimeout(() => {
      this.getBikes().subscribe(bikes => {
        if (JSON.stringify(bikes) != JSON.stringify(this.bikeVergleich)) {
          this.bike$$.next(bikes);
          this.bikeVergleich = bikes;
        }
        this.updateObservables();
      })
    }, 5000)
  }
}
