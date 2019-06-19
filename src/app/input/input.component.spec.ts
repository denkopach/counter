import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { InputComponent } from './input.component';
import {CounterStorageService} from '../services/counter-storage.service';
import {By} from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let counterStorageService: CounterStorageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      providers: [ CounterStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    counterStorageService = fixture.debugElement.injector.get(CounterStorageService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should change firstElement to 2`, fakeAsync(() => {
    component.firstElement.nativeElement.value = 2;
    component.firstElement.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    tick(500);
    expect(counterStorageService['firstSubject'].value).toEqual(2);
  }));

  it(`should change secondElement to 5`, fakeAsync(() => {
    component.secondElement.nativeElement.value = 5;
    component.secondElement.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {}));
    fixture.detectChanges();
    tick(500);
    expect(counterStorageService['secondSubject'].value).toEqual(5);
  }));
});
