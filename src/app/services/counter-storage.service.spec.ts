import {async, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CounterStorageService} from './counter-storage.service';
import {delay, timeInterval} from 'rxjs/operators';
import {interval, timer} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import {enDefaultValues} from '../enums';

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

  // it(`should start, then stop, then reset counter`, fakeAsync(() => {
  //   counterStorageService.start();
  //   tick(1000);
  //   expect(counterStorageService.valueSecond).toEqual(8);
  //   expect(counterStorageService.valueFirst).toEqual(-4);
  //   counterStorageService.stop();
  //   tick(1000);
  //   expect(counterStorageService.valueSecond).toEqual(8);
  //   expect(counterStorageService.valueFirst).toEqual(-4);
  //   counterStorageService.reset();
  //   expect(counterStorageService.valueSecond).toEqual(10);
  //   expect(counterStorageService.valueFirst).toEqual(-5);
  //   discardPeriodicTasks();
  // }));

  it(`should started timer and start increase and decrease methods`, fakeAsync(() => {
    spyOn(counterStorageService, 'increase');
    spyOn(counterStorageService, 'decrease');

    counterStorageService.start();
    tick(1000);
    expect(counterStorageService.increase).toHaveBeenCalled();
    expect(counterStorageService.decrease).toHaveBeenCalledTimes(2);
    discardPeriodicTasks();
  }));

  it(`should reset values to default`, fakeAsync(() => {
    counterStorageService.pushFirst(1);
    counterStorageService.pushSecond(2);
    counterStorageService.reset();
    expect(counterStorageService.valueSecond).toEqual(10);
    expect(counterStorageService.valueFirst).toEqual(-5);
  }));

  it(`should stoped timer`, fakeAsync(() => {
    counterStorageService['timer$'] = interval(enDefaultValues.timerInterval)
      .pipe(timeInterval()).subscribe(() => {
      });
    counterStorageService.stop();
    expect(counterStorageService['timer$'].closed).toBeTruthy();
  }));

  it(`should increase valueFirst to -4`, fakeAsync(() => {
    counterStorageService.increase();
    expect(counterStorageService.valueFirst).toEqual(-4);
  }));

  it(`should decrease valueFirst to 9`, fakeAsync(() => {
    counterStorageService.decrease();
    expect(counterStorageService.valueSecond).toEqual(9);
  }));

  it(`should nothing happen`, fakeAsync(() => {
    const emptyFunction = function () {};
    expect(counterStorageService.change()).toEqual(emptyFunction());
  }));
});
