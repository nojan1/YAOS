import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { EditingComponentBase } from '../editing-component-base';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent extends EditingComponentBase<any> implements OnInit {
  constructor() { 
    super();
  }

  ngOnInit() {
    this.items = [
      {
        name: "H14",
        checkpoints: [
          
        ]
      }
    ]
  }

  protected emptyItemFactory() {
    return {};
  }

}
