import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  //emailField = new FormControl({});
  //pwField = new FormControl({});
  //private email:string;
  //private password:string; //link them in home.page.html -> in ion-input name="email" ([gnModel])="email" etc.
  private signUpForm:FormGroup;
  

  constructor( 
    private authService:AuthenticationService,
    private formBuilder:FormBuilder,
    private router:Router,
    private toaster:ToastController
  )
  {

  }

  ngOnInit(){ //called when the module is initialised
    this.signUpForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });

  }
  signUp( formData ){
    console.log(formData);
    this.authService.signUp( formData.email, formData.password )
    .then( (response) => {
      //sign up successful
      this.showToast('signed up successfully!');
      this.router.navigate(['/notes']);
      console.log(response);
    })
    .catch( (error) => {
      //sign up failed
      this.showToast('Error signing up. Please try again!');
      console.log(error);
    });

    //console.log(this.email, this.password);
    //this.authService.signUp(this.email, this.password);
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
