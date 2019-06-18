import {Component, OnInit} from '@angular/core';
import {CounterStorageService} from '../services/counter-storage.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  constructor(public counterStorageService: CounterStorageService) { }

  ngOnInit() {
  }
}
