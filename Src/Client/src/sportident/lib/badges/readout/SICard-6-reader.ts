import { IBadgeReader } from "./iBadgeReader";
import { IBadgeDecoder } from "../decoder/iBadgeDecoder";
import { Station } from "../../station";
import { sendExtendedCommand, Response } from "../../common";
import { ExtendedCommand } from "../../constants";
import { SICard6Decoder } from "../decoder/SICard-6-decoder";

export class SICard6Reader implements IBadgeReader {
    private badgeData: Buffer = Buffer.alloc(0);
    private blockId: number = 0;
    private numBlocks: number = 8;

    private station: Station;

    private dataBlocks = [0,6,7,2,3,4,5];

    init(station: Station, autoInitiated: boolean){
        this.station = station;

        if(!autoInitiated)
            sendExtendedCommand(station.serialPort, ExtendedCommand.GET_SICARD_6, [this.dataBlocks[this.blockId]]);
    }
   
    process(response: Response) :boolean {
        if(response.command == ExtendedCommand.GET_SICARD_6){
            if(response.data.length != 128){
                console.error("Incorrect data block length");
            }

            this.badgeData = Buffer.concat([this.badgeData, response.data]);
            
            this.blockId++;
            if(this.blockId < this.numBlocks){
                sendExtendedCommand(this.station.serialPort, ExtendedCommand.GET_SICARD_6,  [this.dataBlocks[this.blockId]]);
            }

            return true;
        }else{
            return false;
        }
    }

    getDecodedIfDone(): IBadgeDecoder {
        if(this.numBlocks == 8){
            let decoder = new SICard6Decoder();
            decoder.parse(this.badgeData);

            return decoder;
        }

        return null;
    }
}