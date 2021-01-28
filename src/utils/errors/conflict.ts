import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class Conflict extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    const { CONFLICT } = StatusCodes;
    this.name = getReasonPhrase(CONFLICT);
    this.statusCode = CONFLICT;
  }
}
