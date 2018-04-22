import {
  Component,
  OnInit,ViewChild 
} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

import { EventoService } from './evento-service';


console.log('`Create` component loaded asynchronously');

@Component({
  templateUrl: './create-event.component.html'
})


export class CreateComponent implements OnInit {
isDirty:Boolean = true;
 eventForm: FormGroup;

 @ViewChild(FormGroupDirective) 
formGroupDirective: FormGroupDirective;

   constructor(private eventService: EventoService, private fb: FormBuilder, private route: Router) {}


    ngOnInit() {
        
        this.eventForm = this.fb.group({

         name: ['', Validators.compose([Validators.required, Validators.maxLength(75), Validators.pattern('[a-zA-Z].*')]) ],
         places: ['', Validators.compose([Validators.required, Validators.maxLength(75), Validators.pattern('[a-zA-Z].*')]) ],
         location:  this.fb.group({
         city:['', Validators.compose([Validators.required, Validators.maxLength(55), Validators.pattern('[a-zA-Z].*')]) ],
         address: ['', Validators.compose([Validators.required, Validators.maxLength(175), Validators.pattern('[a-zA-Z].*')]) ]
         }),
         startDate:['', Validators.compose([Validators.required]) ],
         endDate:['', Validators.compose([Validators.required]) ],
         price: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('^[0-9]{1,7}$')])],
         imageUrl: ['', Validators.compose([Validators.required, Validators.pattern('^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$')])
         ]
       })



       
       }


   saveProfile(formValues){
   if(this.eventForm.valid) {
      this.eventService.updateEvento(formValues);
      console.log(formValues);
      console.log(this.eventForm);
      //this.route.navigate(['eventos']);
      this.resetEverything();
   }

 }

resetEverything() {
    // This doesn't work alone, as we know
    this.eventForm.reset();

    // This is needed to clear the 'submitted' state
    this.formGroupDirective.resetForm();
  }
  

   }


