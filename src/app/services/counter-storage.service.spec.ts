import {async, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CounterStorageService} from './counter-storage.service';
import {delay} from 'rxjs/operators';

describe('CounterStorageService', () => {
  let counterStorageService: CounterStorageService;

  beforeEach(() => {
    counterStorageService = new CounterStorageService();

    TestBed.configureTestingModule({
      providers: [
        CounterStorageService
      ]
    });
  });


  it('should be created', () => {
    const service: CounterStorageService = TestBed.get(CounterStorageService);
    expect(service).toBeTruthy();
  });

  it(`should have valueFirst = -5`, () => {
    expect(counterStorageService.valueFirst).toEqual(-5);
  });

  it(`should have valueSecond = 10`, () => {
    expect(counterStorageService.valueSecond).toEqual(10);
  });

  it(`should start, then stop, then reset counter`, fakeAsync(() => {
    counterStorageService.timer();
    tick(1000);
    expect(counterStorageService.valueSecond).toEqual(8);
    expect(counterStorageService.valueFirst).toEqual(-4);
    counterStorageService.stop();
    tick(1000);
    expect(counterStorageService.valueSecond).toEqual(8);
    expect(counterStorageService.valueFirst).toEqual(-4);
    counterStorageService.reset();
    expect(counterStorageService.valueSecond).toEqual(10);
    expect(counterStorageService.valueFirst).toEqual(-5);
    discardPeriodicTasks();
  }));
});
