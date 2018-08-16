import { Injectable, Type } from '@angular/core';

export interface Tab {
  title: string;
  componentType: Type<TabbedComponent>;
  componentReference?: TabbedComponent;
  parameters?: any;
}

export interface TabbedComponent {
  titleChange : (newTitle: string) => void;  
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

  public openTab(componentType: Type<TabbedComponent>, parameters: any = null){
    this.tabs.push({
      title: "Ny tab",
      componentType: componentType,
      parameters: parameters
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

  public setTitle(tab: Tab, title: string){
    if(this.tabs.indexOf(tab) == -1)
      throw new Error("Tab not recognized");

      tab.title = title;
  }
}
