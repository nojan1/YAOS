export interface Punch {
    code: number,
    timestamp: Date
}

export interface IBadgeDecoder {
    readonly punches : Punch[];
    readonly badgeNumber: string;
    parse(data: Buffer);
}