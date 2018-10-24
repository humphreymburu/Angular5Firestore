  import {
    Component,
    OnInit, ElementRef, Input, ViewChild, NgZone
  } from '@angular/core';
  import { FormControl, FormBuilder, FormArray, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
  import {ErrorStateMatcher} from '@angular/material/core';
  import { Router } from '@angular/router';
  
  import { ActivatedRoute } from '@angular/router';
  import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
  import { SimpleModalDiag } from '../+evento/simple-modal-dialog';
  import { MapsAPILoader } from '@agm/core';
 

  /**
   * We're loading this component asynchronously
   * We are using some magic with es6-promise-loader that will wrap the module with a Promise
   * see https://github.com/gdi2290/es6-promise-loader for more info
   */
  
  import { EventoService } from './evento-service';
  import { IEvento, ISession } from './shared/evento-model';
 
  console.log('`Create` component loaded asynchronously');
  declare var google:any;

  @Component({
    templateUrl: './update-event.component.html'
  })
  

  export class UpdateComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;

   //event:IEvento;

   event: any;
   //event$: any;
   private selectedId: number;
   id : string;
   place: any;
   name: string;

   @ViewChild("search")
   public searchElementRef: ElementRef;
  
   filterBy: string ='all';
     constructor(
         private eventService: EventoService, 
         private router: Router, 
         private route: ActivatedRoute,
         private smd: SimpleModalDiag,
         private ngZone: NgZone,
         private mapsAPILoader: MapsAPILoader
         )
          {}
         
         ngOnInit() {
                 

  
    //create search FormControl
    this.searchControl = new FormControl();
      


    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.event = this.eventService.getEvent(this.id);
    this.getEvent();

    



         }
            
     


openDialog() {
  this.smd.openDialog();
}


updateEvento(event: IEvento) {
  this.eventService.updateEvent(event);
}

deleteEvento(event: IEvento) {
  this.eventService.deleteEvent(event);
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
  
  

    
  
     
  