import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController} from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { SocialSharing } from "@ionic-native/social-sharing"
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { MusicPlayerPage } from '../music-player/music-player';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allMusics:any;
  oneSong:any;
  errorMessage:string;

  constructor(
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    public providerMusic: MusicProvider,
    public navCtrl: NavController) {

  }
  ionViewDidLoad(){
    let allMusicsLoadingController = this.loadingController.create({
      content:"Getting Your Music From Server"
    });
    allMusicsLoadingController.present();
    this.getMusics();
    allMusicsLoadingController.dismiss();
    //.subscribe(response => console.log(response));
  }

/*   ionViewDidLoad(){
    this.productService.getProducts()
      .subscribe(respone => console.log(respone));    
  } */

  getMusics(){
    this.providerMusic.getMusic()
    .subscribe(
      allMusics => this.allMusics = allMusics,
      error => this.errorMessage = <any>error);
  }

  addOneSong(refresher){
    this.providerMusic.getOneSong()
      .subscribe(
        oneSong => this.oneSong.unshift(oneSong[0]),
        error => this.errorMessage = <any>error);
        refresher.complete();
  }

  shareSong(music){
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song with Friends",
      buttons:[
        {
          text: "Share On Facebook", 
          icon: "logo-facebook",
          handler: ()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share On Twitter",
          icon: "logo-twitter",
          handler:()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: () =>{
            this.socialSharing.share(music.name,"", music.image, music.music_url);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
           
      ]
    });
    shareSongActionSheet.present();
  }
  goToMusicPlayer(music){
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }
  addToFavorites(music){
    this.providerMusic.addToFavorites(music);
  }
}
