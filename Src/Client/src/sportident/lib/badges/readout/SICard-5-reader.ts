import { IBadgeReader } from "./iBadgeReader";
import { IBadgeDecoder } from "../decoder/iBadgeDecoder";
import { Station } from "../../station";
import { sendExtendedCommand, Response } from "../../common";
import { ExtendedCommand } from "../../constants";
import { SICard5Decoder } from "../decoder/SICard-5-decoder";


export class SICard5Reader implements IBadgeReader {
    private badgeData: Buffer;

    init(station: Station, autoInitiated: boolean){
        if(!autoInitiated)
            sendExtendedCommand(station.serialPort, ExtendedCommand.GET_SICARD_5);
    }
   
    process(response: Response) :boolean {
        if(response.command == ExtendedCommand.GET_SICARD_5){
            this.badgeData = response.data;
            return true;
        }else{
            return false;
        }
    }

    getDecodedIfDone(): IBadgeDecoder {
        if(this.badgeData && this.badgeData.length == 128){
            let decoder = new SICard5Decoder();
            decoder.parse(this.badgeData);
            
            return decoder;
        }else{
            return null;
        }
    }
}