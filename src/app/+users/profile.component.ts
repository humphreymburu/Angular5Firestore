import {
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';


/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`profile` component loaded asynchronously');

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'

})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  private  firstName:FormControl;
  private  lastName:FormControl;

  constructor(private auth: AuthService, private route:Router) {  
  }

  

  public ngOnInit() {
    console.log('hello `Profile` component');

    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);


    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })

 }




 saveProfile(formValues){
   if(this.profileForm.valid) {

      const userData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName
      }

      //this.auth.updateUserData(userData );
      
      this.route.navigate(['eventos']);
   }

 }

  cancel(){
    this.route.navigate(['eventos']);

    
  }


  
}


