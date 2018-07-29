import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-checkpoints',
  templateUrl: './checkpoints.component.html',
  styleUrls: ['./checkpoints.component.scss']
})
export class CheckpointsComponent implements OnInit, TabbedComponent {
  title: string;

  public date: string;

  constructor() { }

  ngOnInit() {
    this.date = new Date().toTimeString();
    this.title = "Tab: " + (new Date().getTime());
  }

}
