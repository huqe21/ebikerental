import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Bike } from '../models/bike.model';
import { Price } from '../models/price.model';
import { Station } from '../models/station.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL: string = 'http://localhost:80/ebike-backend/src/';
  private token: string | undefined;
  private email: string | undefined;

  private userVergleich!: User;
  private bikeVergleich: Array<Bike> = new Array<Bike>;
  private stationVergleich: Array<Station> = new Array<Station>;

  private user$$: ReplaySubject<User> = new ReplaySubject(1);
  private bike$$: ReplaySubject<Bike[]> = new ReplaySubject(1);
  private station$$: ReplaySubject<Station[]> = new ReplaySubject(1);

  public user$: Observable<User> = this.user$$.asObservable();
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

  private getUsers(): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + 'get.php/?f=getUser&email='+this.getEMail()+'&token='+this.getToken());
  }

  private getBikes(): Observable<Bike[]> {
    return this.httpClient.get<Bike[]>(this.apiURL + 'get.php/?f=getEBike');
  }

  private getStations(): Observable<Station[]> {
    return this.httpClient.get<Station[]>(this.apiURL + 'get.php/?f=getStation')
  }
  public getStationsArray(): Array<Station>{
    return this.stationVergleich;
  }
  public rentBike(bikeID: number):Observable<String> {
    return this.httpClient.get<String>(this.apiURL + 'update.php/?f=rent&email=' + this.getEMail() + '&bike=' + bikeID + '&token='+this.getToken());
  }

  public returnBike(bikeID: number, stationID: number){
    // console.log(this.apiURL + 'update.php/?f=returnbike&email=' + this.getEMail() + '&bike=' + bikeID + '&station='+ stationID + '&token='+this.getToken())
   return this.httpClient.get<Price>(this.apiURL + 'update.php/?f=returnbike&email=' + this.getEMail() + '&bike=' + bikeID + '&station='+ stationID + '&token='+this.getToken())
  }
  public addUser(username?: string, firstName?: string, lastName?: string, address?: string, email?: string)
  {
    return this.httpClient.get(this.apiURL+'insert.php/?username='+username+'&firstname='+firstName+'&lastname='+lastName+'&address='+address+'&email='+email)
  }

  private getEMail(): string | undefined {
 this.auth.user$.pipe(map(user => { this.email = user?.email })).subscribe();
    return this.email;
  }

  private getToken(): string | undefined {
   let temp = this.auth.idTokenClaims$.pipe(map(token => this.token = token?.__raw)).subscribe()
   temp.unsubscribe
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
