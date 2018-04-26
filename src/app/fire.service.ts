import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { IEvento, ISession } from './shared/evento-model';
import { 
  AngularFirestore, 
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';


@Injectable()
export class FirestoreService {
  constructor(public afd: AngularFirestore ) {
    //this.db = this.afd.collection('events'); // a ref to the todos collection
  }

}