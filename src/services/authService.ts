import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import userRepository from "../repositories/userRepository.js";
import { iUser } from "../types/types.js";

async function createUser(user: iUser) {
	const existingUser = await userRepository.findUserByEmail(user.email);
	if (existingUser) {
		console.log(existingUser, "user possivel");
		throw { type: "conflict", message: "Email already registered!" };
	}

	const SALT = 10;
	const hashedPassword = bcrypt.hashSync(user.password, SALT);

	return await userRepository.insertUser({ ...user, password: hashedPassword });
}

async function login(login: iUser) {
	const user = await userRepository.findUserByEmail(login.email);
	if (!user) {
		throw { type: "unauthorized", message: "Invalid email or password!" };
	}

	const validPassword = bcrypt.compareSync(login.password, user.password);
	if (!validPassword) {
		throw { type: "unauthorized", message: "Invalid email or password!" };
	}

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	return token;
}

async function findUserById(id: number) {
	const user = await userRepository.findByUserId(id);
	if (!user) {
		throw { type: "notFound", message: "User not FounD!" };
	}
	return user;
}

const authService = {
	createUser,
	login,
	findUserById,
};

export default authService;
