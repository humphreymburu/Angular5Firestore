import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {

  private _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = { content, style };
    this._msgSource.next(msg);
  }

  clear() {
    this._msgSource.next(null);
  }
}