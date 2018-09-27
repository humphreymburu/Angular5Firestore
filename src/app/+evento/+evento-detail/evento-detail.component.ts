
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
//import 'rxjs/add/operator/switchMap';
//import { Observable } from 'rxjs/Observable';

import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';

//import {forkJoin} from 'rxjs'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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

  event: Observable<IEvento>;
  //event$: any;
  private selectedId: number;
  id : string;
  

   filterBy: string ='all';
    constructor(
        private eventService: EventoService, 
        private router: Router, 
        private route: ActivatedRoute,
        private db: AngularFirestore) {}
    
        ngOnInit() {
                this.id = this.route.snapshot.params['id'];
                console.log(this.id);
                this.event = this.eventService.getEvent(this.id);
        }
        

            
        
    

          

}