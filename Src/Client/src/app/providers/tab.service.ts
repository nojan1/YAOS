import { Injectable } from '@angular/core';
import * as TabGroup from 'electron-tabs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  private tabGroup : TabGroup;

  constructor() { }

  public init(){
    this.tabGroup = new TabGroup();
    let tab = this.tabGroup.addTab({
        title: "Electron",
        src: "http://electron.atom.io",
        visible: true
    });
  }
}
