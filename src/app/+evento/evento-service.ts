import { Injectable, Input, EventEmitter, NgZone } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
//import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';

//import {forkJoin} from 'rxjs'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

//import { Subject } from 'rxjs/RX';
//import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { IEvento, ISession } from './shared/evento-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable()
export class EventoService {
 
  id: string | number;
  eventoUrl: number | string;
  ext: string = ".json";



  private eventsCollection: AngularFirestoreCollection<IEvento>;
  private eventDoc: AngularFirestoreDocument<IEvento>;
  events: Observable<IEvento[]>;
  event:  Observable<any>;
  
  
  constructor(private afs: AngularFirestore, http: HttpClient, private loader: MapsAPILoader, zone: NgZone ) {
    this.eventsCollection = afs.collection<IEvento>('Events', ref => ref.orderBy('startDate', 'desc'));
    //this.events = this.eventsCollection.valueChanges();
    
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  add(data: IEvento) {
    const timestamp = this.timestamp
    console.log("data", data);
    return this.eventsCollection.add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
  }


  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.eventsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }






  deleteEvent(event: IEvento) {
    this.eventDoc = this.afs.doc(`Event/${event.id}`);
    this.eventDoc.delete();
  }


  getEvents() {
    return this.events;
    console.log(this.events)
  }


  updateEvent(event: IEvento){
    this.eventDoc = this.afs.doc(`Events/${event.id}`);
    this.eventDoc.update(event);
   }


  getEvent(id: string) {
    return this.afs.doc(`Events/${id}`).snapshotChanges().pipe(
      map(snap => {
      const data = snap.payload.data() as IEvento;
      const id = snap.payload.id;
      return { id, ...data };
    }))
    
  }

   




  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private log(message: string) {
    //this.messageService.add('HeroService: ' + message);
  }



  
   searchSessions(searchTerm: string) {
     var term = searchTerm.toLocaleLowerCase();
     var results: ISession[] = [];

     //EVENTS.forEach(event => {
       //var matchingSessions = event.sessions.filter(session => 
        //session.name.toLocaleLowerCase().indexOf(term) > -1);
        //matchingSessions = matchingSessions.map((session:any) => {
         //session.eventId = event.id;
         //return session;
        //})
        //results = results.concat(matchingSessions);
     //}) 
     
     var emitter = new EventEmitter(true);
      setTimeout(() => {
        emitter.emit(results);
      }, 100);
     return emitter;
  }



  


}