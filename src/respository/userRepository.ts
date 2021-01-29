import { getUserData, saveUserData, findExist } from "../utils";
import { hash, verify } from "../utils";
import { Conflict } from "../utils/errors/conflict";
import { unauthorized } from "../utils/errors/unauthourized";


export const register = async (request: any) => {
  try {
    const { password } = request.body;
    const name = process.env.LOGNAME;
    const existUser = await getUserData("user.json");
    const userexist = await findExist(existUser, name);
    if (userexist) {
        return [null, new Conflict("name already exist")];
    }
    const hashedSaltPassword = await hash(password);
    existUser.push({name, password: hashedSaltPassword });
    await saveUserData(existUser, "user.json");
    return [{name}, null]
  } catch (error) {
    return [null, error];
  }
};

export const login = async(request: any) => {
    try {
        const { password } = request.body;
        const name = process.env.LOGNAME;
        const existUser = await getUserData("user.json");
        const userexist = await findExist(existUser, name);
        const passmatch = await verify(password, userexist.password);
        if (!userexist || !passmatch) {
          return [null, new unauthorized("Unauthorized user")];
        }
        return [{name}, null]

    } catch (error) {
        return [null, error]
    }
}