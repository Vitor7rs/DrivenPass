import { iUser } from "../types/types.js";
import { prisma } from "./../config/db.js";

async function findUserByEmail(email: string) {
	console.log(email, "email aqui");
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

async function insertUser(user: iUser) {
	return prisma.user.create({
		data: user,
	});
}

async function findByUserId(id: number) {
	return prisma.user.findUnique({
		where: { id },
	});
}

const userRepository = {
	findUserByEmail,
	insertUser,
	findByUserId,
};

export default userRepository;
