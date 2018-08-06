import { Injectable } from '@angular/core';
import { TabService } from './tab.service';
import { TabCommandProviderService } from './command-providers/tab-command-provider.service';
import { ICommandProvider, CommandItem, IMatchedCommandBase, CommandType, IMatchedTabCommand } from './command-providers/common';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private providers : ICommandProvider[];

  constructor(private tabService: TabService, private tabCommandProviderService: TabCommandProviderService) { 
    this.providers = [tabCommandProviderService];
  }

  public match(query: string) : CommandItem[] {
    let matchedCommands = this.providers.reduce((a, b) => a.concat(b.match(query)), []) as IMatchedCommandBase[];

    return matchedCommands.map(x => {
      if(x.type == CommandType.Tab){
        let tabCommand = x as IMatchedTabCommand;
        return {
          title: tabCommand.title,
          action: () => this.tabService.openTab(tabCommand.componentType)
        };
      }else{
        throw new Error("Not implemented");
      }
    });
  }
}
