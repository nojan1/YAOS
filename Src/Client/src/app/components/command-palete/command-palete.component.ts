import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import {CommandService } from '../../providers/command.service';
import { CommandItem } from '../../providers/command-providers/common';

@Component({
  selector: 'app-command-palete',
  templateUrl: './command-palete.component.html',
  styleUrls: ['./command-palete.component.scss']
})
export class CommandPaleteComponent implements OnInit {

  searchString: string;

  @ViewChild("commandPalete") paleteInputField: any;
  outputOpen: boolean = false;
  commandItems: CommandItem[] = [];
  activeCommandItem: CommandItem;

  constructor(private commandService: CommandService, private injector: Injector) { }

  ngOnInit() {
    this.commandService.triggerCommandPalate = () => { 
      this.paleteInputField.inputEL.nativeElement.focus();
    }
  }

  search(event){
    if(!this.searchString)
      this.commandItems = [];

    this.commandItems = this.commandService.match(this.searchString);
  }

  onSelect(commandItem: CommandItem){
    commandItem.action(this.injector);
    this.searchString = "";
  }
}
