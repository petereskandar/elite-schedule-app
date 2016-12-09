import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
/*import {HTTP_PROVIDERS} from '@angular/http';*/

import {MyTeamsPage} from '../pages/pages.ts';
import {TournamentsPage} from '../pages/pages.ts';
import {EliteApi} from '../shared/shared';
import {userSettings} from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    userSettings]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  constructor(public platform: Platform) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  goHome(){
    this.nav.push(MyTeamsPage);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}
