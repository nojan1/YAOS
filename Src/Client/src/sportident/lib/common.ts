import * as SerialPort from 'serialport';
import { STX, ETX, Command, ExtendedCommand, NAK, ACK } from './constants';

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

export function sendAck(port: SerialPort) {
    let buffer = new Buffer(1);
    buffer[0] = ACK;

    port.write(buffer);
    port.drain();
}

export function sendExtendedCommand(port: SerialPort, command: ExtendedCommand, parameters?: number[]) {
    return new Promise((resolve, reject) => {
        let protocolLength = parameters ? parameters.length : 0;

        if (protocolLength > 255) {
            reject("Message length longer then 255 is not supported");
            return;
        }

        let workingBuffer = [];

        workingBuffer.push(0xFF);
        workingBuffer.push(STX);
        workingBuffer.push(STX);
        workingBuffer.push(command);
        workingBuffer.push(protocolLength);

        if (parameters) {
            parameters.forEach((v, z) => workingBuffer.push(v));
        }

        let buffer = Buffer.concat([Buffer.from(workingBuffer), Buffer.alloc(3)]);

        let crcSubBuffer = buffer.slice(buffer.indexOf(STX) + 1, buffer.length - 3);
        let crc = calculateCRC(crcSubBuffer);
        buffer.writeUInt16BE(crc, buffer.length - 3);

        buffer[buffer.length - 1] = ETX;

        port.write(buffer, x => {
            if (x) reject(x);
        });

        port.drain(x => x ? reject(x) : resolve());
    });
}

export function sendCommand(port: SerialPort, command: Command, parameters?: number[]) {
    return new Promise((resolve, reject) => {
        let length = 3 + (parameters ? parameters.length : 0);
        let buffer = new Buffer(length);

        buffer[0] = STX;
        buffer[1] = command;

        let i = 2;
        if (parameters) {
            parameters.forEach((v, z) => buffer[i++] = v);
        }

        buffer[i] = ETX;

        port.write(buffer, x => {
            if (x) reject(x);
        });

        port.drain(x => x ? reject(x) : resolve());
    });
}

export function readResponse(port: SerialPort): Response {
    let buffer: Buffer;
    let retryCount = 0;

    do {
        buffer = port.read() as Buffer;
    } while (!buffer && retryCount++ < 50);

    if (!buffer)
        return null;

    return parseResponse(buffer);
}

export function parseResponse(buffer: Buffer): Response {
    if (buffer.length > 0 && buffer[0] == NAK) {
        return {
            command: NAK,
            stationCode: -1,
            data: null
        };
    }

    let stxIndex = 0;
    while (buffer[stxIndex] != STX && stxIndex < buffer.length)
        stxIndex++;

    let len = buffer[stxIndex + 2];
    let totalLength = 6 + len;
    let end = stxIndex + totalLength;

    if (end > buffer.length)
        return null;

    let parsedBuffer = buffer.slice(stxIndex, end);

    if (parsedBuffer[0] != STX || parsedBuffer[parsedBuffer.length - 1] != ETX)
        return null;

    let myCrc = calculateCRC(parsedBuffer.slice(1, parsedBuffer.length - 3));
    let theirCrc = buffer.readUInt16BE(parsedBuffer.length - 3);

    if (myCrc != theirCrc) {
        console.warn("Got message with incorrect CRC. Expected: " + myCrc + " but got " + theirCrc);
        return null;
    }

    return {
        command: parsedBuffer[1],
        data: parsedBuffer.slice(5, parsedBuffer.length - 3),
        stationCode: parsedBuffer.readUInt16BE(3)
    };
}