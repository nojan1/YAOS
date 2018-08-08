import { Injectable } from '@angular/core';
import { WebClient } from '../../WebClient.Generated';
import { HttpClient } from '@angular/common/http';

export const LOCAL_SERVER_ADDRESS = "localhost:5001";
export const EXPECTED_SERVER_VERSION = "0.0.1";

export enum ServerValidationResult {
  ConnectionFailed,
  WrongVersion,
  Success
}

@Injectable({
  providedIn: 'root'
})
export class ServerStateService {

  private _competitionId: number;
  private _serverAddress: string;

  get competitionId() { return this._competitionId; }
  get serverAddress() { return this._serverAddress; }
  get hasValidState() { return this._competitionId && this._serverAddress; }

  get serverBaseUrl() { return this.serverBaseUrlForAddress(this._serverAddress); }
  public serverBaseUrlForAddress = (serverAddress: string) => "https://" + serverAddress;

  constructor(private competitionClient: WebClient.CompetitionClient, private httpClient: HttpClient) { }

  public setServer(serverAddress: string): Promise<ServerValidationResult> {
    return new Promise<ServerValidationResult>((resolve, reject) => {
      this.httpClient.get(this.serverBaseUrlForAddress(serverAddress) + "/api/info")
        .subscribe((value: WebClient.ServerInfo) => {
          if (value.version == EXPECTED_SERVER_VERSION) {
            resolve(ServerValidationResult.Success);
            this._serverAddress = serverAddress;
          }else{
            resolve(ServerValidationResult.WrongVersion);
          }
        }, (error) => {
          resolve(ServerValidationResult.ConnectionFailed);
        });
    });
  }

  public setCompetitionId(competitionId: number) {
    this._competitionId = competitionId;
  }

  public close() {
    this._competitionId = null;
    this._serverAddress = null;
  }

}
