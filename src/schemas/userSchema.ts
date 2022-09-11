import Joi from "joi";
import { iUser } from "../types/types";

export const userSchema = Joi.object<iUser>({
	email: Joi.string().email().required(),
	password: Joi.string().min(10).required(),
});
