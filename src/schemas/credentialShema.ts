import Joi from "joi";
import { iCredential } from "../types/types.js";

export const credentialSchema = Joi.object<iCredential>({
	title: Joi.string().email().required(),
	url: Joi.string().uri().required(),
	username: Joi.string().required(),
	password: Joi.string().min(7).required(),
});
