import { IBadgeDecoder, Punch } from "./iBadgeDecoder";

const PUNCH_BASE_INDEX = 10;

export class SICard5Decoder implements IBadgeDecoder{

    startTime: Date;
    finishTime: Date;
    checkTime: Date;
    punches: Punch[];
    badgeNumber: string;

    public parse(data: Buffer) {
        if(data.length != 128)
            throw new Error("Got SICard 5 data block of incorrect length");

        this.startTime = this.parseTime(data, 25, 33);
        this.finishTime = this.parseTime(data, 41, 49);
        this.checkTime = this.parseTime(data, 73, 81);
        this.badgeNumber = this.parseBadgeNumber(data, 9, 17);

        this.punches = [];
        let numPunches = Math.min(data[57], 30);
        let index = PUNCH_BASE_INDEX;
        for(let i = 0; i < numPunches; i++){
            this.punches.push(this.parsePunch(data, index, index + 8, index + 16));

            if(this.punches.length % 5 == 0)
                index = PUNCH_BASE_INDEX + (this.punches.length / 5); 
            else
                index += 32;
        }
    }    

    private parseTime(data: Buffer, highByteIndex: number, lowByteIndex: number): Date {
        let highByte = data[highByteIndex];
        let lowByte = data[lowByteIndex];

        let rawTime = (highByte << 8) | lowByte;

        let hours = Math.floor(rawTime / 3600);
        let minutes = Math.floor((rawTime - (hours * 3600)) / 60);
        let seconds = rawTime - (hours * 3600) - (minutes * 60);

        let today = new Date();

        return new Date(today.getFullYear(), today.getMonth(), today.getDay(), hours, minutes, seconds);
    }

    private parseBadgeNumber(data: Buffer, highByteIndex: number, lowByteIndex: number): string {
        let highValue = data[highByteIndex];
        let lowValue = data[lowByteIndex];

        return highValue + "" + lowValue; 
    }

    private parsePunch(data: Buffer, stationNumberIndex: number, punchTimeHighIndex: number, punchTimeLowIndex: number): Punch{
        let stationNumber = data[stationNumberIndex];

        return {
            code: stationNumber,
            timestamp: this.parseTime(data, punchTimeHighIndex, punchTimeLowIndex)
        }
    }
}