/**
 * Created by eskandar.peter on 01/12/2016.
 */

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi{

  private baseURL = 'https://elite-schedule-app-i2-9ee5b.firebaseio.com/';
  currentTourney : any = {};
  private tourneyData = {};

  constructor(public http: Http){}

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseURL}/tournaments.json`)
          .subscribe(res => resolve(res.json()));
    })
  }

  /*getTournamentData(tourneyId) : Observable<any> {
    return this.http.get(`${this.baseURL}/tournaments-data/${tourneyId}.json`)
      .map((response : Response) => {
        this.currentTourney = response.json();
        return this.currentTourney;
      })
  }*/

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
      if(!forceRefresh && this.tourneyData[tourneyId]){
        this.currentTourney = this.tourneyData[tourneyId];
        console.log("No need to make a new http call");
        return Observable.of(this.currentTourney);
      }

    //don't have data yet
    console.log("New http call")
    return this.http.get(`${this.baseURL}/tournaments-data/${tourneyId}.json`)
      .map((response : Response) => {
        this.tourneyData[tourneyId] = response.json();
        this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
      })
  }

  getCurrentTourney(){
    return this.currentTourney;
  }

  refreshCurrentTourney(){
    console.log("current tourney : " , this.currentTourney.tournament.id);
    this.getTournamentData(this.currentTourney.tournament.id, true);
  }
}
