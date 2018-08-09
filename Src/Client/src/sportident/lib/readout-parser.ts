import { Transform } from "stream";
import { Station } from "./station";
import { parseResponse } from "./common";
import { ExtendedCommand, ETX } from "./constants";
import { IBadgeReader } from "./badges/readout/iBadgeReader";
import { SICard5Reader } from "./badges/readout/SICard-5-reader";
import { SICard6Reader } from "./badges/readout/SICard-6-reader";
import { SICard8_9Reader } from "./badges/readout/SICard-8_9-reader";

export class Readout extends Transform {

    private buffer: Buffer;
    private badgeReader: IBadgeReader;

    constructor(private station: Station) {
        super();

        if (!station.protocolMode)
            throw new Error("You must read the protocol mode on the station before opening read out");

        this.buffer = Buffer.alloc(0);
    }

    _transform(chunk: any, encoding: string, callback: Function) {
        let data = Buffer.concat([this.buffer, chunk]);

        let response = parseResponse(data);
        if (response) {
            if (this.station.protocolMode.handshake) {
                if (response.command == ExtendedCommand.SICARD_REMOVED) {
                    this.badgeReader = null;
                } else if (response.command == ExtendedCommand.SICARD_5_DETECTED ||
                    response.command == ExtendedCommand.SICARD_6_DETECTED ||
                    response.command == ExtendedCommand.SICARD_8_9_DETECTED) {
    
                    switch (response.command) {
                        case ExtendedCommand.SICARD_5_DETECTED:
                            this.badgeReader = new SICard5Reader();
                            break;
                        case ExtendedCommand.SICARD_6_DETECTED:
                            this.badgeReader = new SICard6Reader();
                            break;
                        case ExtendedCommand.SICARD_8_9_DETECTED:
                            this.badgeReader = new SICard8_9Reader();
                            break;
                    }
    
                    this.badgeReader.init(this.station, false);
                } else if(this.badgeReader) {
                    this.badgeReader.process(response);

                    let decoded = this.badgeReader.getDecodedIfDone();
                    if(decoded)
                    {
                        this.push(decoded);
                        this.badgeReader = null;
                    }
                }else{
                    //Got probable SICard data message without a badgeReader defined... the station is not playing nice
                }
            } else if (this.station.protocolMode.autoSendOut) {
                
            } else {
                throw new Error("Station is not set with any valid readout modes");
            }

            data = data.slice(0, data.indexOf(ETX));
        }

        callback();
    }
}