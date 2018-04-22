import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { IEvento, ISession } from '../shared/evento-model';
import { EventoService } from "../evento-service";

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`EventoDetail` component loaded asynchronously');

@Component({
    templateUrl: './evento-detail.component.html',
    styles: [`
    .event-img: { height: 100px; }
    `]
})


export class EventoDetailComponent implements OnInit {
  //event:IEvento;

  @Input() event: IEvento;

   filterBy: string ='all';
    constructor(
        private eventService: EventoService, 
        private router: Router, 
        private route: ActivatedRoute) {}
    
 ngOnInit(): void {
     //this.route.params.forEach((params:Params)=> {
       //this.event = this.eventService.getEvent(+params['id']);
    // })
//this.getEvent();   
console.log("test eventt", this.getEvent());
    };

    getEvent(){
        //const id = +this.route.snapshot.paramMap.get('id');
       //return this.eventService.getEvent(id)
         // .subscribe(event => this.event = event);
      }



}