import { IBadgeDecoder, Punch } from "./iBadgeDecoder";


export class SICard6Decoder implements IBadgeDecoder{

    startTime: Date;    
    finishTime: Date;
    checkTime: Date;
    punches: Punch[];
    badgeNumber: number;

    parse(data: Buffer) {

    }

}