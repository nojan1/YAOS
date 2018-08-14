import { Type, Injector } from "@angular/core";
import { TabbedComponent } from "../tab.service";

export interface CommandItem {
    title: string;
    action: (injector: Injector) => void;
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

export interface IMatchedGenericCommand extends IMatchedCommandBase {
    action: (injector: Injector) => void;
}