import {
    Component,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  
  import { IEvento, ISession } from '../shared/evento-model';

  
  /**
   * We're loading this component asynchronously
   * We are using some magic with es6-promise-loader that will wrap the module with a Promise
   * see https://github.com/gdi2290/es6-promise-loader for more info
   */
  
  console.log('`UpVote` component loaded asynchronously');
  
  @Component({
    selector: 'upvote',
    styleUrls: [`upvote.component.scss`],
    template:`
    <div class="votingWdgetContainer pointable" (click)="onClick()">
       <div class="well votingWidget">
           <div class="votingButton">
              <mat-icon [style.color]="iconColor" class="mat-icon material-icons" role="img" aria-hidden="true">favorite</mat-icon>
            </div>
               <div class="badge badge-inverse votingCount">
                  <div>{{count}}</div>
                </div>
        </div>
    </div>    
    `
  })
  
  
  export class UpVoteComponent { 
    @Input() count: number;
    @Input() set voted(val) {
      this.iconColor = val ? 'red' : 'blue';
    }

    @Output() vote= new EventEmitter();
     iconColor: string;
    

    onClick() {
        this.vote.emit({});
    }
  }