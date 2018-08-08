import * as SerialPort from 'serialport';
import { STX, ETX, Command, ExtendedCommand, NAK } from './constants';

export interface Response {
    stationCode: number,
    command: number,
    data: Buffer
}

function calculateCRC(buffer: Buffer): number {
    const POLY = 0x8005;
    const BITF = 0x8000;

    let count = buffer.length;
    let i, j;
    let tmp, val;
    let ptr = 0;

    tmp = buffer[ptr++] << 8 | (buffer[ptr++] & 0xFF);

    if (count > 2) {
        for (i = count / 2; i > 0; i--) {
            if (i > 1) {
                val = buffer[ptr++] << 8 | (buffer[ptr++] & 0xFF);
            } else {
                if (count % 2 == 1) {
                    val = buffer[count - 1] << 8;
                } else {
                    val = 0;
                }
            }

            for (j = 0; j < 16; j++) {
                if ((tmp & BITF) != 0) {
                    tmp <<= 1;

                    if ((val & BITF) != 0) {
                        tmp++;
                    }

                    tmp ^= POLY;
                } else {
                    tmp <<= 1;

                    if ((val & BITF) != 0) {
                        tmp++;
                    }
                }

                val <<= 1;
            }
        }
    }

    return tmp & 0xFFFF;
}

export function sendExtendedCommand(port: SerialPort, command: ExtendedCommand, parameters?:number[]) {
    let totalLength =  6 + (parameters ? parameters.length : 0);
    let protocolLength = parameters ? parameters.length : 0;

    if(protocolLength > 255)
        throw new Error("Message length longer then 255 is not supported");

    let buffer = new Buffer(totalLength);

    buffer[0] = STX;
    buffer[1] = command;
    buffer[3] = protocolLength;

    let i = 2;
    if(parameters){
        parameters.forEach((v,z) => buffer[i++] = v);
    }

    let crc = calculateCRC(buffer);
    buffer.writeUInt16LE(crc, i);

    buffer[totalLength - 1] = ETX;

    port.write(buffer);
}

export function sendCommand(port: SerialPort, command: Command, parameters?:number[]) {
    let length = 3 + (parameters ? parameters.length : 0);
    let buffer = new Buffer(length);

    buffer[0] = STX;
    buffer[1] = command;

    let i = 2;
    if(parameters){
        parameters.forEach((v,z) => buffer[i++] = v);
    }

    buffer[i] = ETX;

    port.write(buffer);
}

export function readResponse(port: SerialPort) : Response{    
    let buffer : Buffer;
    let retryCount = 0;

    do{
        buffer = port.read() as Buffer;
    }while(!buffer && retryCount++ < 10);

    if(!buffer)
        return null;

    return parseResponse(buffer);
}

export function parseResponse(buffer: Buffer) : Response {
    let parsedContent = [];
    for(let i = 0; i < buffer.length;i++){
        if(parsedContent.length || buffer[i] == STX || buffer[i] == NAK){
            parsedContent.push(buffer[i]);

            if(buffer[i] == ETX || buffer[i] == NAK)
                break;
        }
    }

    if(parsedContent[0] != STX || parsedContent[parsedContent.length - 1] != ETX)
        return null;

    let parsedBuffer = Buffer.from(parsedContent);

    return {
        command: parsedContent[1],
        data: parsedBuffer.slice(5, parsedBuffer.length - 3),
        stationCode: parsedBuffer.readUInt16LE(3)
    };
}