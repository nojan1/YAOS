import { Component, OnInit, ComponentFactoryResolver, Input, ViewContainerRef, OnDestroy, ComponentRef } from '@angular/core';
import { Tab, TabbedComponent, TabService } from '../../providers/tab.service';

@Component({
  selector: 'app-tab-content-container',
  template: '<ng-content></ng-content>',
})
export class TabContentContainer implements OnInit, OnDestroy {
    
  @Input("tab") tab: Tab;

  private componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, private tabService: TabService) { }

  ngOnInit() {
    if(!this.tab)
        throw new Error("Binded tab is null");

    let factory = this.resolver.resolveComponentFactory(this.tab.componentType);
    this.componentRef = this.viewContainerRef.createComponent(factory);

    let tabbedComponent = this.componentRef.instance as TabbedComponent; 
  }

  ngOnDestroy() {
    if(this.componentRef)
        this.componentRef.destroy();
  }

}
