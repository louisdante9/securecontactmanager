import { register, login } from "../respository/userRepository";
import { encode } from "../utils/jwt";
const { Safe } = require("../safe");


export const signup = async (req, res, next) => {
    const [username, error] = await register(req, res);
    if (error) return next(error);
    const [token, err]: any = await encode(username);;
    if (err) return next(err);

    res.status(201).send({
        token,
    });
    const safe = new Safe()
};
export const signin = async (req, res, next) => {
    const [username, error] = await login(req, res);
    if (error) return next(error);
    const [token, err]: any = await encode(username);;
    if (err) return next(err);
    res.status(201).send({
        token,
    });
};

