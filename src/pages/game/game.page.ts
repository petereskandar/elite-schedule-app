import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/shared';
import {TeamHomePage}  from '../pages';
/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html'
})
export class GamePage {

  gamePlayed: any;

  constructor(public nav: NavController,
              private navParamas : NavParams,
              private eliteApi : EliteApi) {
    console.log("the game is : " , this.navParamas.data)
    this.gamePlayed = this.navParamas.data;
  }

  ionViewWillEnter() {
    this.gamePlayed = this.navParamas.data;
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage , team);
  }

}
