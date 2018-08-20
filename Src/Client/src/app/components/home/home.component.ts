import { Component, OnInit, HostListener } from '@angular/core';
import { TabService } from '../../providers/tab.service';
import { ServerStateService } from '../../providers/server-state.service';
import { Router } from '@angular/router';
import { IEditingComponentBase } from '../editing-component-base';
import { CommandService } from '../../providers/command.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isMaximized: boolean = false;

  constructor(private tabService: TabService,
    private serverStateService: ServerStateService,
    private router: Router,
    private commandService: CommandService ) {

  }

  ngOnInit() {
    if (!this.serverStateService.hasValidState)
      this.router.navigateByUrl("/");
  }

  @HostListener("window:keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == "s" && this.tabService.activeTab) {
      let editingComponent = this.tabService.activeTab.componentReference as any;
      if (editingComponent.save)
        editingComponent.save();

    } else if (event.ctrlKey && event.key == "f") {
      this.isMaximized = !this.isMaximized;

    } else if (event.ctrlKey && event.shiftKey && event.key == "P") {
      if(this.commandService.triggerCommandPalate)
        this.commandService.triggerCommandPalate();

    }
  }

}
