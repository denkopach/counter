import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputComponent } from './output.component';
import {CounterStorageService} from '../services/counter-storage.service';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputComponent ],
      providers: [ CounterStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
