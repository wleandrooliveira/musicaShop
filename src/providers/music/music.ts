import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class MusicProvider {

  public favoriteSongs = [];
 
  private API = 'http://orangevalleycaa.org/api/music';
  constructor(public http: HttpClient) {
    console.log('Hello MusicProvider Provider');
  }

  getMusic():Observable<{}>{
    return this.http.get(this.API).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getOneSong():Observable<{}>{
    let oneSongUrl = this.API + "/qty/1";
    return this.http.get(oneSongUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  getFavorites(){
    return this.favoriteSongs;
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  addToFavorites(song){
    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong)=>{
      return song.id === favoriteSong.id
    });

    if (isSongAdded === -1){
      this.favoriteSongs.push(song);
    }
  }

}
