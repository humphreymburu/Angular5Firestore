import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventoService } from './evento-service';
import { map } from 'rxjs/operators';
@Injectable()
export class EventoListResolver implements Resolve<any> {
    constructor(private eventoService: EventoService){}
 
    resolve() {
    return this.eventoService.getEventos().pipe(
        map(events => events))
   }
}


