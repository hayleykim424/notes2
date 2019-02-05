import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Training } from '../../models/training';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  pageItems:Array<Training> = [];
  items:Array<Training>;
  searchTerm:string;
  searching:boolean = false;
  searchControl:FormControl;
  searchInput:FormControl;

  constructor() {
    
    this.items = [
      {title: "toilet training",
       word: "use multiple pee pads in the house. give them treats, and let them play around it.",
       img: "../assets/toiletTraining.png"},
       {title: "biting",
       word: "hide your hands behind your back If they don't stop, stand up and look away. If they still don't stop, go to your room, close the door and come out after 1 minute. REPEAT",
       img: "../assets/bite.png"},
       {title: "sit",
       word: "place the treat about their heads. They will look up and as soon as they sit down, give them the treat. REPEAT",
       img: "../assets/sit.png"}
    ];
    this.searchInput = new FormControl();
    this.items.forEach( (item) => {
      this.pageItems.push(item);
    });
  }


  ngOnInit() {
    this.searchInput.valueChanges.subscribe( (search) => {
      console.log(search);
      this.searching = false;
        this.searchTerm = search;
        this.filterItems( search );
    });
  }

  filterItems( searchTerm ){
    this.searching = true;
    if( searchTerm.length > 0 ){
      this.pageItems.forEach( (pageItem, index) => {
        if( pageItem.title.indexOf( searchTerm ) == -1 ){
          this.pageItems.splice(index,1);
        }
      });
    }
    else{
      this.searching = false;
      console.log(this.items);
      this.restoreList();
    }
  }
  cancelSearch(){
    this.searching = false;
  }
  restoreList(){
    console.log(this.items);
    this.pageItems = [];
    this.items.forEach( (item) => {
      this.pageItems.push(item);
    });
  }

}
