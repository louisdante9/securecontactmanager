import jwt from "jsonwebtoken";
import util from "util";
/**
 * Encode user information and return token
 *
 * @param {{ [key: string]: any }} userDetails
 * @returns
 */
export const encode = async (payload) => {
  try {
    const key = process.env.APP_SECRET;
    const sign = util.promisify(jwt.sign);
    const token = await sign(payload, key);
    return [token, null];
  } catch (error) {
    return [null, error];
  }
};
