
//Start of text, first byte to be transmitted 
export const STX:number = 0x02;

//End of text, last byte to be transmitte
export const ETX:number = 0x03;

//Positive handshake return
export const ACK:number = 0x06;

//Negative handshake return 
export const NAK:number = 0x15;

//DeLimitEr to be inserted before data characters 00-1F
export const DLE:number = 0x10;

export enum Command {
    SET_MS_MODE = 0x70,
    SET_BAUD_RATE = 0x7E
}

export enum ExtendedCommand {
    GET_BACKUP_DATA = 0x81,
    GET_SYSTEM_VALUE = 0x83,
    GET_SICARD_5 = 0xB1,
    TRANSMIT_RECORD = 0xD3,
    GET_SICARD_6 = 0xE1,
    SICARD_5_DETECTED = 0xE5,
    SICARD_6_DETECTED = 0xE6,
    SICARD_REMOVED = 0xE7,
    SICARD_8_9_DETECTED = 0xE8,
    GET_SICARD_8_9_PUNCHES = 0xEF,
    SET_MS_MODE = 0xF0,
    ERASE_BACKUP_DATE = 0xF5,
    SET_TIME = 0xF6,
    GET_TIME = 0xF7,
    SET_BAUD_RATE = 0xFE
}

export enum MasterStationCommunicationMode {
    DIRECT_COMMUNICATION = 0x4D,
    TRANSPARENT_TO_SLAVE = 0x53
}