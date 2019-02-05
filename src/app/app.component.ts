import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  email: string;

  public appPages = [
    {
      title: 'Sign Up',
      url: '/home',
      icon: 'person-add'
    },
    {
      title: 'Sign In',
      url: '/login',
      icon: 'log-in'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth
  ) {
    this.initializeApp();
    this.afAuth.auth.onAuthStateChanged(
      (user)=>{
        if(user){
          //user is signed in
          //change appPages
          this.appPages = [
            {
              title: 'Notes',
              url: '/notes',
              icon: 'filing'
            },
            {
              title: 'Train!',
              url: '/list',
              icon: 'list'
            },
            {
              title: 'Tips',
              url: '/tips',
              icon: 'happy'
            },
            {
              title: 'Sign Out',
              url: '/signout',
              icon: 'log-out'
            }
          ];
          this.email = user.email;
        }
        else{
          //user is not signed in
          this.email = null;
          this.appPages = [
            {
              title: 'Sign Up',
              url: '/home',
              icon: 'person-add'
            },
            {
              title: 'Sign In',
              url: '/login',
              icon: 'log-in'
            }
          ]
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
