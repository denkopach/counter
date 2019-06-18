import {Injectable} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {timeInterval} from 'rxjs/operators';
import {enDefaultValues} from '../enums';

@Injectable()

export class CounterStorageService {
  private firstSubject: BehaviorSubject<any> = new BehaviorSubject(enDefaultValues.first);
  private secondSubject: BehaviorSubject<any> = new BehaviorSubject(enDefaultValues.second);

  public valueFirst: number;
  public valueSecond: number;

  private timer$;

  constructor() {
    this.firstSubject.subscribe(data => this.valueFirst = data);
    this.secondSubject.subscribe(data => this.valueSecond = data);
  }

  change() {
  }

  increase() {
    this.pushFirst(++this.valueFirst);
  }

  decrease() {
    this.pushSecond(--this.valueSecond);
  }

  pushFirst(data: number) {
    this.firstSubject.next(data);
  }

  pushSecond(data: number) {
    this.secondSubject.next(data);
  }

  timer() {
    this.timer$ = interval(enDefaultValues.timerInterval)
        .pipe(timeInterval())
        .subscribe(() => {
          this.increase();
          this.decrease();
          this.decrease();
        });
  }

  stop() {
    this.timer$.unsubscribe();
  }

  reset() {
    this.firstSubject.next(enDefaultValues.first);
    this.secondSubject.next(enDefaultValues.second);
  }
}
