import { Transform } from "stream";
import { Station } from "./station";
import { parseResponse } from "./common";
import { ExtendedCommand, ETX } from "./constants";

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
                    let baseNumber = [0,0,200000,300000,400000][response.data[1]]
                    let subNumber = response.data.readUInt16BE(2);

                    this.emit("badge", baseNumber + subNumber);
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