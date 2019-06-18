import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {fromEvent as observableFromEvent, Observable, Subscription} from 'rxjs';
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

  constructor(public counterStorageService: CounterStorageService) {
  }

  subscriptions: Subscription[] = [];

  ngOnInit() {
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
