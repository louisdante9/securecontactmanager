import jwt from "jsonwebtoken";
import util from "util";
/**
 * Encode user information and return token
 *
 * @param {{ [key: string]: any }} userDetails
 * @returns
 */
export const encode = async (payload: { [key: string]: any }) => {
  try {
    const key = process.env.APP_SECRET;
    const sign = util.promisify(jwt.sign);
    const token = await sign(payload, key);
    return [token, null];
  } catch (error) {
    return [null, error];
  }
};


/**
 * Decode jwt token and return contained user details
 *
 * @param {string} token
 * @returns
 */
export const decode = async (token: string) => {
  try {
    const key = process.env.APP_SECRET;
    const verify = util.promisify(jwt.verify);
    const user = await verify(token, key);

    return [user, null];
  } catch (error) {
    return [null, error];
  }
};