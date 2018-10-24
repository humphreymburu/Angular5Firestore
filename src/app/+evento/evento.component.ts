import {
  Component,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

import { EventoService } from './evento-service';
import { IEvento } from './shared/evento-model';
import { Observable } from 'rxjs';


console.log('`Evento` component loaded asynchronously');

@Component({
  selector: 'detail',
  template: `
  <div class="upcoming-events">
    <h1 class="title">Upcoming Events</h1>
  </div>

<div fxLayout="row">
<div fxFlex="1"></div>
<div fxFlex="98"><div fxLayout="row wrap" fxLayoutAlign="start center">

<evento-thumbnail *ngFor="let event of eventos | async | slice:0:6" [event] = "event"></evento-thumbnail>
</div></div>
<div fxFlex="1"></div>

</div>








            
  `,
  styles: [`
  .upcoming-events {
    padding: 35px 20px;
    text-align: center; 
    letter-spacing: 2px;
    color: #333;
  }
  .title {
    font-size: 18px;
    font-weight: 400;
  }
  .wrapper {
    color: red;
  }
  .card1 {
    height: 100%; 
    margin: 0px; 
    min-height: 100%; 
    min-width: 100%; 
    width: 100%;
    margin-bottom: 10px; 

  }
  .card2 {
    margin-right: 0px; 
    flex: 1 1 25%; 
    box-sizing: border-box; 
    padding: 0px 10px 10px 0px; 
    max-width: 25%;
  }
   
  `]
})
export class EventoComponent implements OnInit {
eventos: Observable<any[]>;


   constructor(private eventService: EventoService, private route: ActivatedRoute) {}

    ngOnInit() {
     //this.eventService.getEvents().subscribe(events => {this.events = events});
    // this.events = this.route.snapshot.data['events'];

    this.eventos = this.eventService.getData();




    //this.eventService.events
     //.subscribe(eventos => this.eventos = eventos);
   }


  

}
