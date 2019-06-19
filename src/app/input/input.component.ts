import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {fromEvent as observableFromEvent, Subscription} from 'rxjs';
import {distinctUntilChanged, debounceTime, map} from 'rxjs/operators';
import {CounterStorageService} from '../services/counter-storage.service';
import {enDefaultValues} from '../enums';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('firstElement') firstElement: ElementRef;
  @ViewChild('secondElement') secondElement: ElementRef;

  subscriptions: Subscription[] = [];

  valueFirst: number;
  valueSecond: number;

  constructor(public counterStorageService: CounterStorageService) {
  }

  ngOnInit() {

    this.subscriptions.push(this.counterStorageService.first$.subscribe(data => this.valueFirst = data));
    this.subscriptions.push(this.counterStorageService.second$.subscribe(data => this.valueSecond = data));

    this.subscriptions.push(
      observableFromEvent(this.firstElement.nativeElement, 'keyup').pipe(
        map(event => event['target'].value),
        debounceTime(enDefaultValues.keyUpInterval),
        distinctUntilChanged(),
      ).subscribe(data => this.counterStorageService.pushFirst(+data))
    );

    this.subscriptions.push(
      observableFromEvent(this.secondElement.nativeElement, 'keyup').pipe(
        map(event => event['target'].value),
        debounceTime(enDefaultValues.keyUpInterval),
        distinctUntilChanged(),
      ).subscribe(data => this.counterStorageService.pushSecond(+data)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
