import { Injectable, EventEmitter } from '@angular/core';
import { IEvento, ISession } from '../shared/evento-model';


@Injectable()
export class VoterService {
   deleteVoter(session: ISession, voterName: string)
    {
        session.voter = session.voter.filter(voter => voter !== voterName);
    }

    addVoter(session:ISession, voterName:string){
        session.voter.push(voterName);
    }

    userHasVoted(session:ISession, voterName:string){
        return session.voter.some(voter => voter === voterName);
    }
}