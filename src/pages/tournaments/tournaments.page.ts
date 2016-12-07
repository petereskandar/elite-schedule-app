import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import {EliteApi} from '../../shared/elite-api.service';
import {TeamsPage} from '../pages';
/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html'
})
export class TournamentsPage {

  tournaments: any;
  constructor(public nav: NavController, private eliteApi : EliteApi,
              private loadingController : LoadingController) {
    console.log("Tournaments Page");
  }

  ionViewWillEnter() {
    let loader = this.loadingController.create({
      content : 'Loading Tournaments....',
      spinner : 'dots'
    });
    console.log('Hello TournamentsPage Page -- Did load');

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(
          data => {
            this.tournaments = data
            loader.dismiss();
          });
    });

  }


  itemTapped($event , item){
    this.nav.push(TeamsPage, item);
  }

}
