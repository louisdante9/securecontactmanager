import { NextFunction, Request, Response } from "express";
import { decode } from "./jwt";
import { unauthorized } from "./errors/unauthourized";
import { getUserData, findExist } from "../utils";

/**
 * Protects routes that requires authentitcation
 *
 * @param {Request} req
 * @param {Response} res
 * @param {() => {}} next
 *
 * @returns
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return next(new unauthorized("Unauthorized Access"));
  const [decoded, error] = await decode(token);
  if (error) return next(error);
  const user = await getUserData("user.json");
  const userexist = await findExist(user, decoded.name);
  if (!userexist) return next(new unauthorized("Unauthorized Access"));

  req["user"] = userexist;
  return next();
};
