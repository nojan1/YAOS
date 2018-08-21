import * as SerialPort from 'serialport';
import { STX, ETX, Command, ExtendedCommand, NAK } from './constants';

export interface Response {
    stationCode: number,
    command: number,
    data: Buffer
}

export function calculateCRC(buffer: Buffer): number {
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
    let totalLength =  8 + (parameters ? parameters.length : 0);
    let protocolLength = parameters ? parameters.length : 0;

    if(protocolLength > 255)
        throw new Error("Message length longer then 255 is not supported");

    let buffer = new Buffer(totalLength);

    buffer[0] = 0xFF;
    buffer[1] = STX;
    buffer[2] = STX;
    buffer[3] = command;
    buffer[4] = protocolLength;

    let i = 5;
    if(parameters){
        parameters.forEach((v,z) => buffer[i++] = v);
    }

    let crc = calculateCRC(buffer.slice(3, totalLength - 3));
    buffer.writeUInt16BE(crc, i);

    buffer[totalLength - 1] = ETX;

    port.write(buffer);
    port.drain(() => console.log("drain complete"));
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
    let stxIndex = 0;
    while(buffer[stxIndex] != STX && stxIndex < buffer.length)
        stxIndex++;

    let len = buffer[stxIndex + 2];
    let totalLength = 6 + len;
    let end = stxIndex + totalLength;

    if(end > buffer.length)
        return null;

    let parsedBuffer = buffer.slice(stxIndex, end);

    if(parsedBuffer[0] != STX || parsedBuffer[parsedBuffer.length - 1] != ETX)
        return null;

    return {
        command: parsedBuffer[1],
        data: parsedBuffer.slice(5, parsedBuffer.length - 3),
        stationCode: parsedBuffer.readUInt16BE(3)
    };
}