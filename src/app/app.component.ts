/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  Input
} from '@angular/core';


import { AppState } from './app.service';
import { AuthService } from './+users/auth.service';
import { EventoService } from './+evento/evento-service';
import { ISession } from './+evento/shared/evento-model';
import * as firebase from 'firebase/app';
//import { SimpleDialogComponent } from './common/simple-modal.component';



/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],

  templateUrl:'app.component.html'
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Eventa App';
  public url = '';
  public found: string;

  public searchTerm: string = "";
  foundSessions: ISession[];
  public test: boolean;

  


  constructor(public appState: AppState, private auth: AuthService, private eventoServ: EventoService) {}

  isAuth() {
    return this.auth.currentUser;
  }



  searchSessions(searchTerm) {
      this.eventoServ.searchSessions(searchTerm).subscribe
      (sessions => { 
       this.foundSessions = sessions
        console.log(this.foundSessions);
      })

      return  this.foundSessions;
  }


  



  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

