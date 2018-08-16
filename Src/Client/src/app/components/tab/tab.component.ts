import { Component, OnInit, Input } from '@angular/core';

import { TabService } from '../../providers/tab.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input("isMaximized") isMaximized: boolean;

  constructor(public tabService: TabService) { }

  ngOnInit() {
    this.tabService.init();
  }

}
