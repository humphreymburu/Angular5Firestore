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



export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
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

    let getLocation = () => {
      if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
        console.log("Asking user to get their location");
        navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
      } else {
        console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
      }
    };
  
    /* Callback method from the geolocation API which receives the current user's location */
  let geolocationCallback = function(location: any) {
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    //var username = "wesley";
   // geoFire.set(username, [latitude, longitude]).then(function() {
      //console.log("Current user " + username + "'s location has been added to GeoFire");

      // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
      // remove their GeoFire entry
      //firebaseRef.child(username).onDisconnect().remove();

      //log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
    //}).catch(function(error) {
      //log("Error adding user " + username + "'s location to GeoFire");
    //});
  }



    /* Handles any errors from trying to get the user's current location */
    let errorHandler = (error) => {
      if (error.code == 1) {
        console.log("Error: PERMISSION_DENIED: User denied access to their location");
      } else if (error.code === 2) {
        console.log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
      } else if (error.code === 3) {
        console.log("Error: TIMEOUT: Calculating the user's location too took long");
      } else {
        console.log("Unexpected error code")
      }
    };
  
    // Get the current user's location
    getLocation();
  
  }

}

