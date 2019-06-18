import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ControlsComponent } from './controls.component';
import {CounterStorageService} from '../services/counter-storage.service';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;
  let counterStorageService: CounterStorageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsComponent ],
      providers: [ CounterStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    counterStorageService = fixture.debugElement.injector.get(CounterStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should click on start button`, fakeAsync(() => {
    spyOn(component, 'start');
    fixture.debugElement.nativeElement.querySelector('#start-button').click();
    fixture.detectChanges();
    expect(component.start).toHaveBeenCalled();
  }));

  it(`should click on stop button`, fakeAsync(() => {
    spyOn(component, 'stop');
    fixture.debugElement.nativeElement.querySelector('#stop-button').click();
    fixture.detectChanges();
    expect(component.stop).toHaveBeenCalled();
  }));

  it(`should click on reset button and call reset func`, fakeAsync(() => {
    spyOn(counterStorageService, 'reset');
    fixture.debugElement.nativeElement.querySelector('#reset-button').click();
    fixture.detectChanges();
    expect(counterStorageService.reset).toHaveBeenCalled();
  }));

  it(`should call start func in storage service`, fakeAsync(() => {
    spyOn(counterStorageService, 'start');
    component.start();
    expect(counterStorageService.start).toHaveBeenCalled();
  }));

  it(`should call stop func in storage service`, fakeAsync(() => {
    spyOn(counterStorageService, 'stop');
    component.stop();
    expect(counterStorageService.stop).toHaveBeenCalled();
  }));
});

