import { Request, Response } from "express";

import authService from "../services/authService.js";

export async function signIn(req: Request, res: Response) {
	const user = req.body;
	const token = await authService.login(user);
	return res.status(200).send({ token });
}

export async function signUp(req: Request, res: Response) {
	const user = req.body;
	await authService.createUser(user);
	return res.sendStatus(201);
}
