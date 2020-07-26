export class EmptyColumnNameError extends Error {
  constructor(
    message: string,
    public readonly csv: string,
    public readonly line: string,
    public readonly lineNumber: number
  ) {
    super(message);
  }
}
