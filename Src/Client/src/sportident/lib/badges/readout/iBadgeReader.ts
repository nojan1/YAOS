import { IBadgeDecoder } from "../decoder/iBadgeDecoder";
import { Station } from "../../station";
import { Response } from "../../common";

export interface IBadgeReader {
    init(station: Station, autoInitiated: boolean);
    process(response: Response) : boolean;
    getDecodedIfDone(): IBadgeDecoder;
}