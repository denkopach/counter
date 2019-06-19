import {Component, OnDestroy, OnInit} from '@angular/core';
import {CounterStorageService} from '../services/counter-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  valueFirst: number;
  valueSecond: number;

  constructor(public counterStorageService: CounterStorageService) { }

  ngOnInit() {
    this.subscriptions.push(this.counterStorageService.first$.subscribe(data => this.valueFirst = data));
    this.subscriptions.push(this.counterStorageService.second$.subscribe(data => this.valueSecond = data));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
