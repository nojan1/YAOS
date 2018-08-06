import { Type } from "../../../../node_modules/@angular/core";
import { TabbedComponent } from "../tab.service";

export interface CommandItem {
    title: string;
    action: () => void;
}

export interface ICommandProvider {
    init(): void;
    match(query: string): IMatchedCommandBase[];
}

export enum CommandType {
    Tab,
    Command
}

export interface IMatchedCommandBase {
    title: string;
    type: CommandType;
}

export interface IMatchedTabCommand extends IMatchedCommandBase {
    componentType: Type<TabbedComponent>;
}