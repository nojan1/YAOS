import { Type, Injectable } from '@angular/core';
import { TabService, TabbedComponent } from './tab.service';
import { CheckpointsComponent } from '../components/checkpoints/checkpoints.component';

export interface CommandItem {
  title: string;
  action: () => void;
}

interface ICommandProvider {
  init(): void;
  match(query: string): IMatchedCommandBase[];
}

enum CommandType {
  Tab,
  Command
}

interface IMatchedCommandBase {
  title: string;
  type: CommandType;
}

interface IMatchedTabCommand extends IMatchedCommandBase{
  componentType: Type<TabbedComponent>;
}

class TabCommandProvider implements ICommandProvider{
  init(): void {
    
  }  
  
  match(query: string): IMatchedTabCommand[] {
    let matches = [];
    
    if("Administrera kontroller".indexOf(query) != -1){
      matches.push({
        title: "Administrera kontroller",
        type: CommandType.Tab,
        componentType: CheckpointsComponent
      });
    }

    return matches;
  }

}

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private providers : ICommandProvider[];

  constructor(private tabService: TabService) { 
    this.providers = [new TabCommandProvider()];
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
