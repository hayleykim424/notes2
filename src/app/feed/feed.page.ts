import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'; //notification
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(
    private localNotifications: LocalNotifications,
    private toaster:ToastController
  ) { }

  ngOnInit() {
  }


  feedDog() {
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Time to feed your dog!',
      trigger: {at: new Date(new Date().getTime() + 10)}, //3hours is 10800 but I made it short to get notification asap to show this function works
      led: 'FF0000',
      sound: null
    });
    this.showToast('You have fed your dog!');

  }

  //show toast
  async showToast(message:string){
    const toast = await this.toaster.create({
      message: message,
      position: 'bottom',
      duration: 1000
    });
    toast.present();
  }
}
