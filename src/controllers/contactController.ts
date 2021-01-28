import { create, update, getAll, filter } from "../respository/contactRepository";

export const addContact = async (req, res, next) => {
  const { body } = req;
  const [contact, error] = await create(body, res);
  if (error) return next(error);
  res.send({ success: true, msg: "contact added successfully" });
};

export const edit = async (req, res, next) => {
  const [contact, error] = await update(req, res);
  if (error) return next(error);
  res.send({
    success: true,
    msg: "contact data updated successfully",
    contact,
  });
};

export const all = async (req, res, next) => {
  const [contacts, error] = await getAll();
  if (error) return next(error);
  res.send(contacts);
};
export const search = async (req, res, next) => {
  const [contacts, error] = await filter(req);
  if (error) return next(error);
  res.send(contacts);
};


