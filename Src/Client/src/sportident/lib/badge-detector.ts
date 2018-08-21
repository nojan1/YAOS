import { Transform } from "stream";
import { Station } from "./station";
import { parseResponse } from "./common";
import { ExtendedCommand, ETX } from "./constants";
import { buildBadgeNumber } from "./badges/decoder/SICard-5-decoder";

export class Detector extends Transform {

    private buffer: Buffer;

    constructor(private station: Station) {
        super();

        this.buffer = Buffer.alloc(0);
    }

    _transform(chunk: any, encoding: string, callback: Function) {
        let data = Buffer.concat([this.buffer, chunk]);

        let response = parseResponse(data);
        if (response) {
            switch (response.command) {
                case ExtendedCommand.SICARD_5_DETECTED:
                    this.emit("badge", buildBadgeNumber(response.data[1], response.data.readUInt16BE(2)));
                    break;
                case ExtendedCommand.SICARD_6_DETECTED:
                case ExtendedCommand.SICARD_8_9_DETECTED:
                    this.emit("badge", response.data.readUInt32BE(0));
                    break;
            }

            data = data.slice(0, data.indexOf(ETX));
        }

        callback();
    }

    private parseBadgenumber(data: Buffer, indexes: number[]){
        let retVal = "";
        indexes.forEach(i => retVal += data[i]);

        return retVal;
    }
}