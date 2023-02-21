import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Bike } from '../models/bike.model';
import { Station } from '../models/station.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL: string = 'http://localhost:80/api/';

  private user$$: Subject<User[]> = new Subject;
  private bike$$: Subject<Bike[]> = new Subject;
  private station$$: Subject<Station[]> = new Subject;

  public user$: Observable<User[]> = this.user$$.asObservable();
  public bike$: Observable<Bike[]> = this.bike$$.asObservable();
  public station$: Observable<Station[]> = this.station$$.asObservable();

  private userVergleich: Array<User> = new Array<User>;
  private bikeVergleich: Array<Bike> = new Array<Bike>;
  private stationVergleich: Array<Station> = new Array<Station>;

  constructor(private httpClient: HttpClient) {
    this.getBikes().subscribe(bikes => this.bike$$.next(bikes));
    this.getUsers().subscribe(users => this.user$$.next(users));
    this.getStations().subscribe(stations => this.station$$.next(stations));
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

  private updateObservables() {

    setTimeout( () => {
      this.getStations().subscribe(stations => {
       if (JSON.stringify(stations) != JSON.stringify(this.stationVergleich)) {
         this.station$$.next(stations);
         this.stationVergleich = stations;
       }
     });
   }, 5000)

    setTimeout(async () => {
      await this.getUsers().subscribe(users => {
        if (JSON.stringify(users) != JSON.stringify(this.userVergleich)) {
          this.userVergleich = users;
          this.user$$.next(users);
        }
      }
      )
    }, 5000)
    setTimeout( () => {
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
