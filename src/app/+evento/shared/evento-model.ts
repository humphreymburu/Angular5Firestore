import { Timestamp } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { Subject } from 'rxjs/RX';
//import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { IEvento, ISession } from './shared/evento-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as firebase from 'firebase/app';

//const timestamp = snapshot.get('created_at');
//const date = timestamp.toDate();

export interface IEvento {
    id?: number | string,
    name?: string,
    startDate: Date,
    endDate: Date,
    time?: string,
    price: number,
    imageUrl: string,
    places?: string,
    location?: {
        address: string,
        city: string,
        country?: string
    },
    updatedAt?: any,
    createdAt?: any
    //onlineUrl?: string,
    //sessions: ISession[]
}



export interface  ISession {
    id: number,
    name: string,
    presenter: string,
    duration: number,
    level: string,
    abstract: string,
    voter?: string[]
}

