import { IBadgeDecoder, Punch } from "./iBadgeDecoder";

export class SICard5Decoder implements IBadgeDecoder{
    punches: Punch[];
    badgeNumber: string;

    public parse(data: Buffer) {
        
    }    
}