import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotifictionService {
  notification:Subject<any>=new Subject<any>();
  notify(obj:object): void{
    this.notification.next(obj);
  }

  constructor() { }
}
