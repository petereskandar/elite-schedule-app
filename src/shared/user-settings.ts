/**
 * Created by eskandar.peter on 07/12/2016.
 */


import {Injectable} from '@angular/core';
import {LocalStorage, Storage} from 'ionic-angular';

@Injectable()
export class userSettings{

  storage = new Storage(LocalStorage);
  constructor(){}

  favoriteTeam(team, tournamentId, tournamentName){
    let item = {
      team : team,
      tournamentId : tournamentId,
      tournamentName : tournamentName
    };

    this.storage.set(team.id, JSON.stringify(item));
  }

  unfavoriteTeam(team){
    this.storage.remove(team.id);
  }

  isFavoriteTeam(teamId){
    this.storage.get(teamId).then(value => value ? true : false);
  }
}
