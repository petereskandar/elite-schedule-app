import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import {EliteApi} from '../../shared/elite-api.service';
import {GamePage} from '../pages';


/*
  Generated class for the TeamDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {

  team:any;
  games:any[];
  private tourneyData : any;
  teamStandings:any;

  constructor(public nav: NavController,
              private navParams : NavParams,
              private eliteApi : EliteApi) {
  }

  ionViewWillLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
                .filter(g => g.teamId === this.team.id || g.team2Id === this.team.id)
                .map(g => {
                          let isTeam1 = (g.teamId === this.team.id);
                          let opponentName = isTeam1 ? g.team2 : g.team1;
                          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                          return {
                            gameId : g.id,
                            opponent : opponentName,
                            time : Date.parse(g.time),
                            location : g.location,
                            locationUrl : g.locationUrl,
                            scoreDisplay : scoreDisplay,
                            homeAway:(isTeam1 ? "vs." : "at")
                          };
                })
                .value();
    this.teamStandings = _.find(this.tourneyData.standings, {'teamId': this.team.id});
    console.log('Hello TeamDetailPage Page', this.teamStandings);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score  : team1Score);
      var winIndicator = teamScore > opponentScore ? "W" : "L";
      return winIndicator +" : " + team1Score + "_" + opponentScore;
    }
  }

  goHome(){
    this.nav.parent.parent.popToRoot();
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.nav.parent.parent.push(GamePage,sourceGame);
  }

}
