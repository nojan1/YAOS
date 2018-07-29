import { Component, OnInit } from '@angular/core';
import { TabService } from '../../providers/tab.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor(private tabService: TabService) { }

  ngOnInit() {
  }

  public openTab(){
    this.tabService.openTab();
  }

}
