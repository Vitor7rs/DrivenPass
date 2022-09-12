import { prisma } from "../config/db.js";
import { iCredential } from "../types/types.js";

async function getAll(userId: number) {
	return prisma.credential.findMany({
		where: { userId },
	});
}

async function getCredential(userId: number, credencialId: number) {
	return prisma.credential.findFirst({
		where: {
			userId,
			id: credencialId,
		},
	});
}

async function getCredentialByTitle(userId: number, title: string) {
	//find with title, find id only bug. Back here, need fix
	return prisma.credential.findFirst({
		where: { userId, title },
	});
}

async function insertCredential(userId: number, credential: iCredential) {
	return prisma.credential.create({
		data: { ...credential, userId },
	});
}

async function deleteCredential(id: number) {
	return prisma.credential.delete({ where: { id } });
}

const credentialRepository = {
	getAll,
	getCredential,
	getCredentialByTitle,
	insertCredential,
	deleteCredential,
};

export default credentialRepository;
