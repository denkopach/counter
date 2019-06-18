import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CounterStorageService} from './services/counter-storage.service';
import {InputComponent} from './input/input.component';
import {ControlsComponent} from './controls/controls.component';
import {OutputComponent} from './output/output.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputComponent,
        OutputComponent,
        ControlsComponent
      ],
      providers: [
        CounterStorageService
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Counter'`, () => {
      expect(component.title).toEqual('Counter');
  });
});
