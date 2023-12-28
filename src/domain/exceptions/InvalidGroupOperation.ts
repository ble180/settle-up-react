export class InvalidGroupOperation extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGroupOperation';
  }
}
