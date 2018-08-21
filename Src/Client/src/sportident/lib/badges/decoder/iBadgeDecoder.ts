export interface Punch {
    code: number,
    timestamp: Date
}

export interface IBadgeDecoder {
    readonly startTime: Date,
    readonly finishTime: Date,
    readonly checkTime: Date,
    readonly punches : Punch[];
    readonly badgeNumber: number;
    parse(data: Buffer);
}