//import { detectBaseStation, Station } from "../lib/station";
import * as SerialPort from "serialport";

SerialPort.list().then(x => console.log(x));
