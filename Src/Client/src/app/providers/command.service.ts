import { Injectable } from '@angular/core';
import { TabService } from './tab.service';
import { TabCommandProviderService } from './command-providers/tab-command-provider.service';
import { ICommandProvider, CommandItem, IMatchedCommandBase, CommandType, IMatchedTabCommand, IMatchedGenericCommand } from './command-providers/common';
import { GenericCommandProviderService } from './command-providers/generic-command-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private providers : ICommandProvider[];

  constructor(private tabService: TabService, private tabCommandProviderService: TabCommandProviderService, private genericCommandProviderService: GenericCommandProviderService) { 
    this.providers = [tabCommandProviderService, genericCommandProviderService];
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
        let genericCommand = x as IMatchedGenericCommand;
        return {
          title: genericCommand.title,
          action: genericCommand.action
        };
      }
    });
  }
}
