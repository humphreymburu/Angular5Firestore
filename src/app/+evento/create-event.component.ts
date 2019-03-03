import {
  Component,
  OnInit, Input, ViewChild 
} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { DropZoneDirective }  from  './drop-zone-directive';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { EventoImage } from './evento-image.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { catchError, map, finalize, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FileValidator } from 'ngx-material-file-input';

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

import { EventoService } from './evento-service';
import { IEvento, ISession } from './shared/evento-model';
import { directiveDef } from '@angular/core/src/view';

console.log('`Create` component loaded asynchronously');

@Component({
  templateUrl: './create-event.component.html'
})


export class CreateComponent implements OnInit {
isDirty:Boolean = true;
eventForm: FormGroup;
store: any; 
fileSize: any;
percentage: Observable<number>;
snapshot: Observable<any>;
evento: Observable<any>;
isHovering: boolean;
private eventsCollection: AngularFirestoreCollection<IEvento>;
url: any;
readonly maxSize = 104857600;

 @Input() event: IEvento;


 @ViewChild(FormGroupDirective) 
formGroupDirective: FormGroupDirective;

   constructor(private eventService: EventoService, private fb: FormBuilder, private route: Router, private storage: AngularFireStorage, private afs: AngularFirestore) { 
    this.eventsCollection = afs.collection<IEvento>('Events');
  
  }

    ngOnInit() { 
        this.eventForm = this.fb.group({

         name: ['', Validators.compose([Validators.required, Validators.maxLength(75), Validators.pattern('[a-zA-Z].*')]) ],
         places: ['', Validators.compose([Validators.required, Validators.maxLength(75), Validators.pattern('[a-zA-Z].*')]) ],
         startDate:['', Validators.compose([Validators.required]) ],
         endDate:['', Validators.compose([Validators.required]) ],
         price: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('^[0-9]{1,7}$')])],
         url: ['', Validators.compose([Validators.required, Validators.pattern('^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$')])
         ],
         requiredfile: [ undefined, [Validators.required, FileValidator.maxContentSize(this.maxSize)]
        ],


       })   
       
    }

   









     saveProfile(formValues){ 
      if(this.eventForm.valid) {
      this.eventService.add(formValues);
      console.log("test values", formValues);
      console.log(this.eventForm);
      //this.route.navigate(['eventos']);
      this.resetEverything();
    }

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
  const task = this.storage.upload(path, file, { customMetadata })
  const percentage = task.percentageChanges();



  task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.url = url; 
          console.log(url);
        });
      })
    ).subscribe();

  
  // The file's download URL
  //this.downloadURL = this.task.downloadURL(); 
  this.snapshot = task.snapshotChanges().pipe(
    tap(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        this.afs.collection('Events').add( { path, size: snap.totalBytes })
      }
    })
  )
  
}

// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}
    resetEverything() {
      // This doesn't work alone, as we know
      this.eventForm.reset();

      // This is needed to clear the 'submitted' state
      this.formGroupDirective.resetForm();
    }


    



  
    

}


