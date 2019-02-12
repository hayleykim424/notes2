import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NoteAddPage } from '../note-add/note-add.page';
import { DataService } from '../data.service';
import { NotesEditPage } from '../notes-edit/notes-edit.page';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes:Array<any> = [];
  now:number;
  constructor(
    private modalController:ModalController,
    private dataService:DataService
    
    //private navParams:NavParams
  ) { 
    this.now = new Date().getTime(); //new Date(): creates a date object.
  }

  ngOnInit() {
    this.getNotes();
  }

  async createNote() {
    const modal = await this.modalController.create({
      component: NoteAddPage,
      componentProps: {}
    });
    modal.onDidDismiss().then( (response) => {
      console.log(response);
      if(response.data.save == true) {
        //save data to firebase
        this.dataService.writeData( response.data.note);
      }
    });
    await modal.present();
  }

  getNotes(){
    this.dataService.readData().subscribe( (response) => {
      this.notes = response;
      console.log(this.notes);
      this.sortNotes();
    });
  }

  sortNotes(){
    this.notes.sort( (note1, note2) => {
      return note2.date - note1.date;
    } );
  }

  async editNote(note){
    const modal = await this.modalController.create({
      component: NotesEditPage,
      componentProps: note //from parameter of this function
    });
    modal.onDidDismiss().then( (response) => {
      if(response.data.save == true) {
        //save data to firebase with key of the note
        console.log(response.data.note);
        this.dataService.updateNote( response.data.note )
        .then( (response) => { console.log(response) });
      }
    });
    await modal.present();
  }


  formatDate(date:number){
    let diff = this.now - date;
    let seconds = diff / 1000;
    //if less than 60 seconds, return 'just now'
    if( seconds < 60 ){
      return 'just now';
    }
    //if between 60 secs and 1 hour (3600 secs)
    else if( seconds >= 60 && seconds < 3600 ){
      let mins = Math.floor( seconds / 60 );
      let mUnit = mins == 1 ? 'minute' : 'minutes';
      return mins + ' ' + mUnit + ' ago';
    }
    //if between an hour and 1 day
    else if( seconds >= 3600 && seconds <= 24*3600 ){
      let hours = Math.floor( seconds / 3600 );
      let hUnit = hours == 1 ? 'hour' : 'hours';
      let mins = Math.floor( (seconds - ( hours * 3600 )) / 60 );
      let mUnit = mins == 1 ? 'minute' : 'minutes';
      return hours + ' ' + hUnit + ' ' + mins + ' ' + mUnit + ' ago';
    }
    //if between 1 day and 1 week
    else if( seconds >= 24 * 3600 ){
      let days = Math.floor( seconds / (3600 * 24) );
      let dUnit = days == 1 ? 'day' : 'days';
      let hours = Math.floor( (seconds - ( days * 24 * 3600 )) / 3600);
      let hUnit = hours == 1 ? 'hour' : 'hours';
      return days + ' ' + dUnit + ' ' + hours + ' ' + hUnit + ' ' + 'ago';
    }
  }

}
