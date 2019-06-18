import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CounterStorageService} from '../services/counter-storage.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @ViewChild('startButton') startButton: ElementRef;

  constructor(public counterStorageService: CounterStorageService) { }

  ngOnInit() {
  }

  start() {
    this.startButton.nativeElement.disabled = true;
    this.counterStorageService.timer();
  }

  stop() {
    this.startButton.nativeElement.disabled = false;
    this.counterStorageService.stop();
  }
}
