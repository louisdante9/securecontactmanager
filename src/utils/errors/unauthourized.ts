import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class unauthorized extends Error {
  /**
   * Constructor for unauthorized
   *
   * @param message
   */
  public statusCode: number;
  constructor(message: string) {
    super(message);
    const { UNAUTHORIZED } = StatusCodes;
    this.name = getReasonPhrase(UNAUTHORIZED);
    this.statusCode = UNAUTHORIZED;
  }
}
