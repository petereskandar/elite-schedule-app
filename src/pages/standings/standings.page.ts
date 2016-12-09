import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {EliteApi} from '../../shared/elite-api.service';
import * as _ from 'lodash';

/*
  Generated class for the Standings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {

  standings: any[];
  allStandings: any;
  team: any;

  constructor(public navCtrl: NavController,
              private navParama : NavParams,
              private eliteApi : EliteApi) {}

  ionViewDidLoad() {
    console.log('Hello StandingsPage Page');
    this.team = this.navParama.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

   /* this.allStandings = _.chain(this.standings)
                        .groupBy('division')
                        .toPairs()
                        .map(item => _.zipObject(['divisionName','divisionStandings'], item))
                        .value();*/
    console.log('division standings ' , this.standings)

  }

  getHeader(record, recordIndex, records){
    if(recordIndex  === 0 || record.division !== records[recordIndex-1].division){
      return record.division;
    }else
      return null;
  }

}
