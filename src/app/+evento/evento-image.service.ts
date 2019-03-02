import { Injectable, Component, Input, EventEmitter, NgZone } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
//import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';

//import {forkJoin} from 'rxjs'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { catchError, map, finalize, tap } from 'rxjs/operators';
import { IEvento, ISession } from './shared/evento-model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
   

     
  @Injectable()
  export class EventoImage {
  

  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  event:  Observable<any>;
  fileSize: any;
  url: any;
  task: any;

  private eventsCollection: AngularFirestoreCollection<IEvento>;

  constructor(private afs: AngularFirestore, http: HttpClient, zone: NgZone, private storage: AngularFireStorage) {
    this.eventsCollection = afs.collection<IEvento>('Events', ref => ref.orderBy('startDate', 'desc'));
    //this.events = this.eventsCollection.valueChanges();
    
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)
    

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    const path = `test/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    const customMetadata = { app: 'tukio' };
    this.task = this.storage.upload(path, file, { customMetadata })
    this.percentage = this.task.percentageChanges();



    this.task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.url = url; 
          });
        })
      ).subscribe();
  
    
    // The file's download URL
    //this.downloadURL = this.task.downloadURL(); 

    
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
