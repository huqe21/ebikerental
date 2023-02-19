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
  private bike$$: Subject<Bike[]> = new Subject ;
  private station$$: Subject<Station[]> = new Subject;

  public user$: Observable<User[]> = this.user$$.asObservable();
  public bike$: Observable<Bike[]> = this.bike$$.asObservable();
  public station$: Observable<Station[]> = this.station$$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getBikes().subscribe(bikes => this.bike$$.next(bikes));
    this.getUsers().subscribe(users => this.user$$.next(users));
    this.getStations().subscribe(stations => this.station$$.next(stations));
    this.updateObservables();
  }

  private getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL+'get.php/?f=getUser');
  }

  private getBikes(): Observable<Bike[]> {
  return this.httpClient.get<Bike[]>(this.apiURL+'get.php/?f=getEBike');
  }

  private getStations(): Observable<Station[]>{
    return this.httpClient.get<Station[]>(this.apiURL+'get.php/?f=getStation')
  }

  private updateObservables(){

    setTimeout(async () => {await this.getUsers().subscribe(users => this.user$$.next(users)) },5000)
    setTimeout(async () => {await this.getBikes().subscribe(bikes => this.bike$$.next(bikes))},5000)
    setTimeout(async () => {await this.getStations().subscribe(stations => this.station$$.next(stations)); this.updateObservables(); },5000)
}
}
