/**
 * Created by eskandar.peter on 30/11/2016.
 */
import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';

import {TournamentsPage, TeamHomePage} from '../pages';
import {EliteApi} from '../../shared/elite-api.service';

@Component({
  templateUrl: 'my-teams.page.html'
})

export class MyTeamsPage{

  favorites = [
    {
      team :{ id: 6182, name:'HC Elite 7th', coach: 'James'},
      tournamentName: 'March Madness Tournament',
      tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63'
  },
    {
      team : {id: 805, name: 'HC Elite', coach : 'Bartlett'},
      tournamentId : '98c6857e-b0d1-4295-b89e-2d95a45437f2',
      tournamentName: 'Holiday Hoops Challenge'

  }];
  constructor(private nav : NavController,
              private loadingController : LoadingController,
              private eliteApi : EliteApi){}

  goToTournaments(){
      this.nav.push(TournamentsPage);
  }

  favoriteTapped($event, favorite){
    let loader = this.loadingController.create({
      content: 'Getting Data...',
      spinner: 'dots',
      dismissOnPageChange: true
    });

    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(
      t=> {
        console.log("Tournament Data : " , t);
        this.nav.push(TeamHomePage, favorite.team)}
    )

  }
}
