import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscriber, Subscription} from 'rxjs';
import {timeInterval} from 'rxjs/operators';
import {enDefaultValues} from '../enums';

@Injectable()

export class CounterStorageService {
  private firstSubject: BehaviorSubject<number> = new BehaviorSubject(enDefaultValues.first);
  private secondSubject: BehaviorSubject<number> = new BehaviorSubject(enDefaultValues.second);
  private timer$: Subscription;

  public first$ = this.firstSubject.asObservable();
  public second$ = this.secondSubject.asObservable();

  constructor() {
  }

  change() {
  }

  increase() {
    let currentValue: number = this.firstSubject.value;
    this.pushFirst(++currentValue);
  }

  decrease() {
    let currentValue: number = this.secondSubject.value;
    this.pushSecond(--currentValue);
  }

  pushFirst(data: number) {
    this.firstSubject.next(data);
  }

  pushSecond(data: number) {
    this.secondSubject.next(data);
  }

  start() {
    this.timer$ = interval(enDefaultValues.timerInterval)
        .pipe(timeInterval())
        .subscribe(() => {
          this.increase();
          this.decrease();
          this.decrease();
        });
  }

  stop() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }

  reset() {
    this.firstSubject.next(enDefaultValues.first);
    this.secondSubject.next(enDefaultValues.second);
  }
}
