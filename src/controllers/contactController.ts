import { NextFunction, Request, Response } from "express";
import { create, update, getAll, filter } from "../respository/contactRepository";

export const addContact = async (req, res, next) => {
  const { body } = req;
  const [contact, error] = await create(body);
  if (error) return next(error);
  res.send({ success: true, msg: "contact added successfully" });
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const [contact, error] = await update(req);
  if (error) return next(error);
  res.send({
    success: true,
    msg: "contact data updated successfully",
    contact,
  });
};

export const all = async (req: Request, res: Response, next: NextFunction) => {
  const [contacts, error] = await getAll();
  if (error) return next(error);
  res.send(contacts);
};
export const search = async (req: Request, res: Response, next: NextFunction) => {
  const [contacts, error] = await filter(req);
  if (error) return next(error);
  res.send(contacts);
};


