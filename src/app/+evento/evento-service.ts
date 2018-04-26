import { Injectable, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/RX';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { IEvento, ISession } from './shared/evento-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class EventoService {
 
  id: number | string;
  eventoUrl: number | string;
  ext: string = ".json";


  private eventsCollection: AngularFirestoreCollection<IEvento>;
  events: Observable<IEvento[]>;
  //private afsss: AngularFirestoreDocument<Event>;


    
  
  constructor(afs: AngularFirestore, http: HttpClient ) {
    this.eventsCollection = afs.collection<IEvento>('Events');
    //this.events = this.eventsCollection.valueChanges();
    
    this.events = this.eventsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as IEvento;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
 


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
  }


  getEventos() {
    return this.events;
  }


  






  getEvent() {
  // this.eventoUrl = "https://tukio-1cb4e.firebaseio.com/Events/" + id + "/" + this.ext;
   //const url = `${this.eventoUrl}`;
    //return this.http.get<IEvento>(url).pipe(
      //tap(_ => this.log(`fetched event id=${id}`)),
      //catchError(this.handleError<IEvento>(`getEvent id=${id}`))
    //);
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


  //updateEvento(event) {
       //event.id = 999
       //event.session = []
       //EVENTS.push(event)
 // }

  updateEvento(event: IEvento) {

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

