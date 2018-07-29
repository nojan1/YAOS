import { Injectable, Type } from '@angular/core';
import { CheckpointsComponent } from '../components/checkpoints/checkpoints.component';

export interface Tab {
  title: string;
  componentType: Type<any>;
}

export interface TabbedComponent {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {

  public tabs: Tab[] = [];
  public activeTab : Tab;

  constructor() { }

  public init(){

  }

  public openTab(){
    this.tabs.push({
      title: "Test",
      componentType: CheckpointsComponent
    });

    this.activeTab = this.tabs[this.tabs.length - 1];
  }

  public setActive(tab: Tab){
    if(this.tabs.indexOf(tab) == -1)
      throw new Error("Tab not recognized");

    this.activeTab = tab;
  }

  public closeTab(tab: Tab){
    let tabIndex = this.tabs.indexOf(tab);

    if(tabIndex == -1)
      throw new Error("Tab not recognized");

    if(this.activeTab == tab){
      if(tabIndex == 0){
        this.activeTab = this.tabs[1];
      }else{
        this.activeTab = this.tabs[tabIndex - 1];
      }
    }

    this.tabs.splice(tabIndex, 1);
  }
}
