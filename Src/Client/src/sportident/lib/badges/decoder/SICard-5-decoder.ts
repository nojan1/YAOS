import { IBadgeDecoder, Punch } from "./iBadgeDecoder";

const PUNCH_BASE_INDEX = 33;

export function buildBadgeNumber(series: number, subNumber: number){
    let baseNumber = [0,0,200000,300000,400000][series];
    return baseNumber + subNumber;
}

export class SICard5Decoder implements IBadgeDecoder{

    startTime: Date;
    finishTime: Date;
    checkTime: Date;
    punches: Punch[];
    badgeNumber: number;

    public parse(data: Buffer) {
        if(data.length != 128)
            throw new Error("Got SICard 5 data block of incorrect length");

        this.startTime = this.parseTime(data, 19);
        this.finishTime = this.parseTime(data, 21);
        this.checkTime = this.parseTime(data, 25);
        this.badgeNumber = this.parseBadgeNumber(data, 6, 17);

        this.punches = [];
        let numPunches = Math.min(data[23], 30);
        
        let index = PUNCH_BASE_INDEX;
        for(let i = 0; i < numPunches; i++){
            this.punches.push(this.parsePunch(data, index));

            if(this.punches.length % 5 == 0)
                index += 4
            else
                index += 3;
        }
    }    

    private parseTime(data: Buffer, index: number): Date {
        let rawTime = data.readUInt16BE(index);

        let hours = Math.floor(rawTime / 3600);
        let minutes = Math.floor((rawTime - (hours * 3600)) / 60);
        let seconds = rawTime - (hours * 3600) - (minutes * 60);

        let today = new Date();

        return new Date(today.getFullYear(), today.getMonth(), today.getDay(), hours, minutes, seconds);
    }

    private parseBadgeNumber(data: Buffer, cardSeriesIndex: number, subNumberIndex: number): number {
        let cardSeries = data[cardSeriesIndex]; 

        return buildBadgeNumber(cardSeries, data.readUInt16BE(subNumberIndex)); 
    }

    private parsePunch(data: Buffer, baseIndex: number): Punch{
        let stationNumber = data[baseIndex];

        return {
            code: stationNumber,
            timestamp: this.parseTime(data, baseIndex + 1)
        }
    }
}