  import {
    Component,
    OnInit, Input, ViewChild 
  } from '@angular/core';
  import { FormControl, FormBuilder, FormArray, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
  import {ErrorStateMatcher} from '@angular/material/core';
  import { Router } from '@angular/router';
  
  import { ActivatedRoute } from '@angular/router';
  import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

  /**
   * We're loading this component asynchronously
   * We are using some magic with es6-promise-loader that will wrap the module with a Promise
   * see https://github.com/gdi2290/es6-promise-loader for more info
   */
  
  import { EventoService } from './evento-service';
  import { IEvento, ISession } from './shared/evento-model';
  
  console.log('`Create` component loaded asynchronously');
  
  @Component({
    templateUrl: './update-event.component.html'
  })
  
  
  export class UpdateComponent implements OnInit {

   //event:IEvento;

   event: any;
   //event$: any;
   private selectedId: number;
   id : string;
   
 
    filterBy: string ='all';
     constructor(
         private eventService: EventoService, 
         private router: Router, 
         private route: ActivatedRoute)
          {}
     
         ngOnInit() {
                 this.id = this.route.snapshot.params['id'];
                 console.log(this.id);
                 this.event = this.eventService.getEvent(this.id);

                 this.getEvent();
         }
         
     



updateEvento(event: IEvento) {
  this.eventService.updateEvent(event);
}
  

getEvent(): any {
  this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  this.event = this.eventService.getEvent(this.id);
    return this.event.subscribe(data => {
      this.event = data;
    })
}
     
  
   
  
  
   }
  
  

    
  
     
  