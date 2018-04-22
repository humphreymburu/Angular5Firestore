import {
  Component, Input, Pipe
} from '@angular/core';
import { IEvento, ISession } from './shared/evento-model';
 

@Component({
    selector: 'evento-thumbnail',
    template: `

    <mat-card class="mag" fxFlex="0 0 97%">
    <div [routerLink] ="['/evento', event.id]">
    <h2 class="title2"> {{event?.name }}</h2>
    <div><strong>Start Date:</strong> {{event?.startDate | date }}</div>  
    <div><strong>End Date: </strong>{{event?.endDate | date }}</div>
    <div [ngClass]="getStartTimeClass()" [ngSwitch] = "event?.time">
   <strong> Time:</strong> {{event?.time}}
    <span *ngSwitchCase="'8:00 am'">, Earley Start</span>
    <span *ngSwitchCase="'10:00 am'">, Late Start</span>
    <span *ngSwitchDafault> (normal-start)</span>

    </div>
    <div><strong>Price:</strong> \Ksh {{event?.price }}</div>
    <div><strong>Place:</strong> {{event?.places}}</div>
    <div *ngIf = event?.location>
    <span><strong>Location:</strong>{{event?.location?.address}}</span>
    <span class="pad-left">&nbsp;</span>
    <span>{{event?.location?.city}}, 
    {{event?.location?.country}}</span>
    </div>
    <div *ngIf = event?.onlineUrl>
    <strong>Online URL:</strong> {{event?.onlineUrl}}
    </div>
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
     .mag {
       
        min-height: 235px;
        max-height: 250px;
        overflow: hidden;
        margin-bottom: 20px;
     }
     .title2 {
        font-size: 1.1em;
     }
     .mat-card:first-child
     {
        margin-left: 10px;
     }
     .mat-card {
        max-width: 295px !important;
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