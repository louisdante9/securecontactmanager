import { NextFunction, Request, Response } from "express";
import { register, login } from "../respository/userRepository";
import { encode } from "../utils/jwt";
import { cipher } from "../utils/index";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const [username, error] = await register(req);
  if (error) return next(error);
  const contact = [];
  await cipher("data.json", contact);
  const [token, err]: any = await encode(username);
  if (err) return next(err);

  res.status(201).send({
    token,
  });
};
export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const [username, error] = await login(req);
  if (error) return next(error);
  const [token, err]: any = await encode(username);
  if (err) return next(err);
  res.status(200).send({
    token,
  });
};

