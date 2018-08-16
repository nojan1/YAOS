import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import {CommandService } from '../../providers/command.service';
import { CommandItem } from '../../providers/command-providers/common';

@Component({
  selector: 'app-command-palete',
  templateUrl: './command-palete.component.html',
  styleUrls: ['./command-palete.component.scss']
})
export class CommandPaleteComponent implements OnInit {

  @ViewChild("paleteInput") paleteInputField: ElementRef;
  outputOpen: boolean = false;
  commandItems: CommandItem[] = [];
  activeCommandItem: CommandItem;

  constructor(private commandService: CommandService, private injector: Injector) { }

  ngOnInit() {
    this.commandService.triggerCommandPalate = () => { 
      this.paleteInputField.nativeElement.focus();
      this.onActivate();
    }
  }

  onActivate(){
    this.outputOpen = true;
  }

  onInput(event: any){
    this.activeCommandItem = null;
    this.commandItems = this.commandService.match(event.target.value);
  }

  onKeyUp(event: any) {
    if (event.key == "Escape") {
      this.closeOutput();
    } else if (event.key == "ArrowUp") {
      this.changeCommandItem(-1);
      event.stopPropagation();
    } else if (event.key == "ArrowDown") {
      this.changeCommandItem(+1);
      event.stopPropagation();
    } else if (event.key == "Enter" && this.activeCommandItem) {
      this.selectCommandItem(this.activeCommandItem);
    }
  }

  changeCommandItem(directionNumber: number) {
    if (this.commandItems.length == 0)
      return;

    let currentIndex = (!this.activeCommandItem) ? -1
      : this.commandItems.indexOf(this.activeCommandItem);

    let index = (currentIndex + directionNumber) % this.commandItems.length;
    this.activeCommandItem = this.commandItems[index];
  }

  selectCommandItem(commandItem: CommandItem){
    commandItem.action(this.injector);
    this.paleteInputField.nativeElement.value = "";
    
    this.closeOutput();
  }

  closeOutput() {
    
    this.paleteInputField.nativeElement.blur();
    this.activeCommandItem = null;
    this.outputOpen = false;
  }

}
