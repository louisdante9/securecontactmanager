import { getUserData, saveUserData, findExist } from "../utils";
import { Conflict } from "../utils/errors/conflict";
import { unauthorized } from "../utils/errors/unauthourized";
import { NotFound } from "../utils/errors/notfound";


export const create = async (request, response) => {
	const { name, email, phone, address } = request;
	try {
		const existUsers = await getUserData("datastore.json");
		if (name == null || email == null || phone == null || address == null) {
			return [null, new NotFound("User data missing")];
		}

		const userexist = await findExist(existUsers, name);
		if (userexist) {
			return [null, new Conflict("name already exist")];

		}
		existUsers.push({ name, email, phone, address });
		await saveUserData(existUsers, "datastore.json");
		return [{ name, email, phone, address }, null];
	} catch (error) {
		return [null, error]
	}
};

export const update = async (request, response) => {
	try {
		const name = request.params.name;
		const userData = request.body;
		const existUsers = await getUserData("datastore.json");
		const userexist = await findExist(existUsers, name);
		if (!userexist) return [null, new NotFound("name does not exist")];
		const updateUser = existUsers.filter((user) => user.name !== name);
		updateUser.push(userData);
		await saveUserData(updateUser, "datastore.json");
		return [userData, null];
	} catch (error) {
		return [null, error]
	}
};

export const getAll = async () => {
	try {
		const contacts = await getUserData("datastore.json");
		return [contacts, null]
	} catch (error) {
		return [null, error]
	}
};

export const filter = async (request) => {
	try {
		const { q } = request.query;
		const existUsers = await getUserData("datastore.json");
		const result = existUsers.filter((user) => {
			if (
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