import { IBadgeReader } from "./iBadgeReader";
import { IBadgeDecoder } from "../decoder/iBadgeDecoder";
import { Station } from "../../station";
import { sendExtendedCommand, Response } from "../../common";

export class SICard6Reader implements IBadgeReader {
    init(station: Station, autoInitiated: boolean){
        
    }
   
    process(response: Response) :boolean {
        throw new Error("Method not implemented.");
    }

    getDecodedIfDone(): IBadgeDecoder {
        throw new Error("Method not implemented.");
    }
}