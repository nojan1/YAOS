import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private _competitionId: number;
  private _serverAddress: string;

  get competitionId() { return this._competitionId; }
  get serverAddress() { return this._serverAddress; }
  get hasValidState() { return this._competitionId && this._serverAddress; }

  constructor() { }

  public open(competitionId: number, serverAddress: string){
    // this._competitionId = competitionId;
    // this._serverAddress = serverAddress;

    this._serverAddress = "localhost:5000";
    this._competitionId = 1;
  }

  public close(){
    this._competitionId = null;
    this._serverAddress = null;
  }
}
