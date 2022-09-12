import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import authService from "../services/authService.js";

export async function authValidator(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers["authorization"];
	if (!authorization) {
		throw { type: "unauthorized", message: "Need authorization!" };
	}
	const token = authorization.replace("Bearer ", "");
	if (!token) {
		throw { type: "unauthorized", message: "Token requiered!" };
	}
	try {
		const JWT_SECRET = process.env.JWT_SECRET;
		const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };
		const user = await authService.findUserById(userId);
		next();
	} catch {
		throw { type: "unauthorized", message: "Invalid TOken!" };
	}
}
