import { iUser } from "../types/types.js";
import { prisma } from "./../config/db.js";

async function findUserByEmail(email: string) {
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

// async function findUserById(id: number) {
// 	return prisma.user.findUnique({
// 		where: { id },
// 	});
// }

const userRepository = {
	findUserByEmail,
	insertUser,
};

export default userRepository;
