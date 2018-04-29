import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { EventoService } from "../evento-service";


@Injectable()
export class EventoRouteActivator implements CanActivate {
    constructor(private eventoService: EventoService, private router: Router){}
   id: string; 

    canActivate(route:ActivatedRouteSnapshot) {
    const eventExist = !!this.eventoService.getEvent(this.id);
    
    if(!eventExist)
      this.router.navigate(['**'])
    return eventExist

    }
}

