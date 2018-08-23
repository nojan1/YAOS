import * as SerialPort from 'serialport';
import { sendCommand, sendExtendedCommand, readResponse } from './common';
import { ExtendedCommand, NAK, Command, MasterStationCommunicationMode } from './constants';
import { resolve } from 'url';
import { Readout } from './readout-parser';
import { Detector } from './badge-detector';

export enum BaudRate {
    B4800 = 4800,
    B38400 = 38400
}

export enum StationType {
    BSM_7_8,
    BSM_3_4_6
}

export interface StationInfo {
    type: StationType,
    baudRate: BaudRate
}

export interface ProtocolMode {
    extendedProtocol: number,
    autoSendOut: number,
    handshake: number,
    passwordAccess: number,
    readSICardAfterPunch: number
}

export function detectBaseStation(comName: string, serialPort: any): Promise<StationInfo> {
    return new Promise((resolve, reject) => {
        let port = new serialPort(comName, {
            baudRate: BaudRate.B38400,
            dataBits: 8,
            parity: "none",
            stopBits: 1,
            autoOpen: false
        });

        port.on("error", console.error);

        port.open(x => {
            if (x) {
                console.error(x);
                reject("Failed to open port");
                return;
            }

            sendExtendedCommand(port, ExtendedCommand.SET_MS_MODE, [MasterStationCommunicationMode.DIRECT_COMMUNICATION])
                .then(() => {
                    let response = port.read() as Buffer;
                    if (response && response[0] != NAK) {
                        port.close();

                        resolve({
                            type: StationType.BSM_7_8,
                            baudRate: BaudRate.B38400
                        });

                        return;
                    }

                    port.update({
                        baudRate: BaudRate.B4800
                    }, x => {
                        if (x) {
                            console.error(x);
                            reject("Failed to change baudrate");
                            return;
                        }

                        sendExtendedCommand(port, ExtendedCommand.SET_MS_MODE, [MasterStationCommunicationMode.DIRECT_COMMUNICATION])
                            .then(() => {
                                response = port.read() as Buffer;

                                if (response && response[0] != NAK) {
                                    port.close();

                                    resolve({
                                        type: StationType.BSM_7_8,
                                        baudRate: BaudRate.B4800
                                    });

                                    return;
                                }

                                sendCommand(port, Command.SET_MS_MODE, [MasterStationCommunicationMode.DIRECT_COMMUNICATION])
                                    .then(() => {
                                        response = port.read() as Buffer;
                                        port.close();

                                        if (response) {
                                            resolve({
                                                type: StationType.BSM_3_4_6,
                                                baudRate: BaudRate.B4800
                                            });

                                            return;
                                        }

                                        reject("No reply from station");
                                    })
                                    .catch(x => reject(x));
                            })
                            .catch(x => reject(x))
                    });
                })
                .catch(x => reject(x));
        });
    });
}

export class Station {

    private _serialPort: SerialPort;
    private _protocolMode: ProtocolMode;

    public get protocolMode() { return this._protocolMode; }
    public get serialPort() { return this._serialPort; }

    //TODO: Remove me!
    public set protocolMode(x: ProtocolMode) {
        this._protocolMode = x;
    }

    constructor(private comName: string, private stationInfo: StationInfo, serialPort: any) {
        this._serialPort = new serialPort(comName, {
            baudRate: stationInfo.baudRate,
            dataBits: 8,
            parity: "none",
            stopBits: 1
        });

        this._serialPort.on("error", x => console.error(x));
    }

    public changeSpeed(baudRate: BaudRate) {
        return new Promise((resolve, reject) => {
            let speedByte = baudRate == BaudRate.B4800 ? 0x01 : 0x00;

            sendExtendedCommand(this._serialPort, ExtendedCommand.SET_BAUD_RATE, [speedByte])
                .then(() => {
                    let response = readResponse(this._serialPort);
                    if (!response || response.data[0] != speedByte) {
                        reject("Incorrect speed in reply or empty response");
                        return;
                    }

                    this.stationInfo.baudRate = baudRate;
                    this._serialPort.update({
                        baudRate: baudRate
                    }, x => x ? reject(x) : resolve());
                })
                .catch(x => reject(x));
        });
    }

    public readProtocolMode(): Promise<ProtocolMode> {
        return new Promise((resolve, reject) => {
            sendExtendedCommand(this._serialPort, ExtendedCommand.GET_SYSTEM_VALUE, [0x70, 0x06])
                .then(() => {
                    let response = readResponse(this._serialPort);
                    if (!response) {
                        reject("No response");
                        return;
                    }

                    let protocolConfigurationByte = response.data[0];
                    this._protocolMode = {
                        extendedProtocol: (protocolConfigurationByte >> 0) & 0x01,
                        autoSendOut: (protocolConfigurationByte >> 1) & 0x01,
                        handshake: (protocolConfigurationByte >> 2) & 0x01,
                        passwordAccess: (protocolConfigurationByte >> 4) & 0x01,
                        readSICardAfterPunch: (protocolConfigurationByte >> 7) & 0x01
                    };

                    resolve(this.protocolMode);
                })
                .catch(x => { reject(x); });
        });
    }

    public cardReadout(): Readout {
        let readoutParser = new Readout(this);
        this._serialPort.pipe(readoutParser);

        return readoutParser;
    }

    public badgeDetect(): Detector {
        let detectParser = new Detector(this);
        this._serialPort.pipe(detectParser);

        return detectParser;
    }

    public destroy() {
        this._serialPort.destroy();
    }
}