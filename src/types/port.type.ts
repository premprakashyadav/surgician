import { IPort } from './port.interface';

export class Port implements IPort {
  name: string;

  constructor(port: IPort) {
    this.name = port.name;
  }
}
