import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';
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
  dateFilter: string;
  allGames:any[];
  team:any;
  games:any[];
  private tourneyData : any;
  teamStandings:any;
  useDateFilter:boolean = false;
  isFollowing:boolean = false;

  constructor(public nav: NavController,
              private navParams : NavParams,
              private eliteApi : EliteApi,
              private alertCtrl : AlertController,
              private toastCtrl : ToastController) {
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
    this.allGames = this.games;
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

  getScoreWorL(game){
      return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreClass(game){
    return game.scoreDisplay.indexOf('W') === 0 ? 'badge-primary' : 'badge-danger';
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.nav.parent.parent.push(GamePage,sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter)
        this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    else
        this.games = this.allGames;
  }

  toggleFollow(){
      if(this.isFollowing){
        let confirm = this.alertCtrl.create({
          title: 'Unfollow ?',
          message: 'Are you sure you want to unfollow ? ',
          buttons:[
            {
              text:'Yes',
              handler:()=>{
                this.isFollowing = false;
                //TODO : persist data here later
                let toast = this.toastCtrl.create({
                  message:'you have unfollowed this team',
                  duration:2000,
                  position : 'bottom'
                });
                toast.present();
              }
            },
            {
              text:'No'
            }
          ]
        });

        confirm.present();
      }else{
        this.isFollowing = true;
      }
  }
}
