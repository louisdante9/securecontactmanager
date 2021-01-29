import { findExist,cipher, decipher } from "../utils";
import { Conflict } from "../utils/errors/conflict";
import { NotFound } from "../utils/errors/notfound";


export const create = async (request: any) => {
	const { name, email, phone, address } = request;
	try {
		const existUsers = await decipher("data.json");
		if (name == null || email == null || phone == null || address == null) {
			return [null, new NotFound("User data missing")];
		}
		
		const userexist = await findExist(existUsers, name);
		if (userexist) return [null, new Conflict("name already exist")];
	
		existUsers.push({ name, email, phone, address });
		const encrypt = await cipher("data.json", existUsers);
		return [{ name, email, phone, address }, null];
	} catch (error) {
		return [null, error]
	}
};

export const update = async (request:any) => {
	try {
    const name = request.params.name;
    const userData = request.body;
    const contacts = await decipher("data.json");
    const userexist = await findExist(contacts, name);
    if (!userexist) return [null, new NotFound("name does not exist")];
    const updateUser = contacts.filter((user) => user.name !== name);
    updateUser.push(userData);
    const encrypt = await cipher("data.json", updateUser);
    return [userData, null];
  } catch (error) {
		return [null, error]
	}
};

export const getAll = async () => {
	try {
		// const contacts = await getUserData('datastore.json')
		const contacts = await decipher("data.json");
		return [contacts, null]
	} catch (error) {
		return [null, error]
	}
};

export const filter = async (request: any) => {
	try {
		const { q } = request.query;
		const existUsers = await decipher("data.json");
		const result = existUsers.filter((user) => {
			if (
				q =='' ||
				user.name === q ||
				user.email == q ||
				user.address == q ||
				user.phone == q
			) {
				return user;
			}
		});
		return [result, null];
	} catch (error) {
		return [null, error]
	}
};