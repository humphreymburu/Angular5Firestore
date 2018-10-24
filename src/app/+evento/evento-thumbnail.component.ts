import {
  Component, Input, Pipe
} from '@angular/core';
import { IEvento, ISession } from './shared/evento-model';
 

@Component({
    selector: 'evento-thumbnail',
    template: `
    <mat-card fxFlex="390px" class="card1">
    <div [routerLink] ="['/evento', event.id]">
    <h2 class="title2"> {{event?.name }}</h2>
    <div><strong>Start Date:</strong> {{event?.startDate | date:'fullDate' }}</div>  
    <div><strong>End Date: </strong>{{event?.endDate | date }}</div>
    <div><strong>Price:</strong> \Ksh {{event?.price }}</div>
    <div><strong>Place:</strong> {{event?.places}}</div>
    </div>
    </mat-card>
    `,
    styles: [` 
     .pad-left { 
      margin-left: 10px;
      }
     .green {
      color: #e91e63 !important;}  
     .bold {
         font-weight: bold;}
     .title2 {
        font-size: 1.1em;
     }
     mat-card{
         margin: 10px;
     }
     .card1 {
        max-width: 25%;
        height: 100%; 
        height: 260px;
        min-height: 100%; 
        min-width: 100%; 
        width: 100%; 
       
      }

    `]
})
   
export class EventoThumbnailComponent {
  @Input() event:IEvento;

  getStartTimeClass() {
      const isEarly = this.event && this.event.time === '8:00 am';
      return {green: isEarly,  bold: isEarly };
      
  }

}