import {
  Component,
  OnInit, Input, OnChanges
} from '@angular/core';




import { IEvento, ISession } from '../shared/evento-model';
import { EventoService } from "../evento-service";
import { AuthService }  from "../../+users/auth.service";
import { VoterService }  from "../+evento-detail/voter.services";
import { IUser } from './user.model';

/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Session List` component loaded asynchronously');

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})


export class SessionListComponent implements  OnChanges { 
    @Input() sessions:ISession[];
    @Input() filterBy: string;
    visibleSessions: ISession[] = [];

    constructor(private auth: AuthService, private voterService: VoterService){
        console.log(auth.user);
    }

    ngOnChanges() {
        if(this.sessions){
            this.filterSessions(this.filterBy);
        }
    }

   filterSessions(filter) {
       if(filter ==='all') {
        this.visibleSessions = this.sessions.slice(0);
       } else {
         this.visibleSessions = this.sessions.filter(session =>  {
            return session.level.toLowerCase() === filter;
         })  
       }
   }
   

   toggleVote(session: ISession, auth: AuthService){
       if(this.userHasVoted(session)){
           this.voterService.deleteVoter(session, this.auth.currentUser.displayName);
       } else {
           console.log(this.auth.user);
           this.voterService.addVoter(session, this.auth.currentUser.displayName);
       }

   }

  userHasVoted(session: ISession) {
      return this.voterService.userHasVoted(session, this.auth.currentUser.displayName);
  }


}