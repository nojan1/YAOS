import { Component, OnInit } from '@angular/core';

import { TabService } from '../../providers/tab.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.tabService.init();
  }

}
