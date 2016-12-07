import { Component } from '@angular/core';
import { NavController , NavParams , LoadingController } from 'ionic-angular';

import * as _ from 'lodash';
import {TeamHomePage} from '../pages';
import {EliteApi} from '../../shared/elite-api.service';

/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {

  private allTeams : any;
  private allTeamDivisions: any;
  teams = [];

  constructor(public nav: NavController,
  private navParams : NavParams,
  private eliteApi : EliteApi,
  private loadingController : LoadingController) {}

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting Data....'
    });

    loader.present().then(()=>{

      this.eliteApi.getTournamentData(selectedTourney.id).subscribe( data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName','divisionTeams'], item))
          .value();

        this.teams = this.allTeamDivisions;
        console.log("Division Teams : " , this.teams);
        loader.dismiss();
      });

    });


  }

  itemTapped($event, team){
    this.nav.push(TeamHomePage, team);
  }

}
