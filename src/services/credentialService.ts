import { User, Credential } from "@prisma/client";
import credentialRepository from "../repositories/credentialRepository.js";
import { iCredential } from "../types/types.js";
import { encrypt, decrypt } from "../utils/cryptFunctions.js";

async function getAllCredentials(userId: number) {
	const credentials = await credentialRepository.getAll(userId);
	return credentials.map((credential) => {
		const { password } = credential;
		return { ...credential, password: decrypt(password) };
	});
}

async function getCredential(userId: number, credentialId: number) {
	const credential = await credentialRepository.getCredential(
		userId,
		credentialId
	);
	if (!credential) {
		throw { type: "notFound", message: "Crendential not found!" };
	}
	return {
		...credential,
		password: decrypt(credential.password),
	};
}

async function createCredential(user: User, credential: iCredential) {
	//search with title, back here later, id only bug, need fix
	const existingCredential = await credentialRepository.getCredentialByTitle(
		user.id,
		credential.title
	);
	if (existingCredential) {
		throw { type: "conflict", message: "title used!" };
	}
	const credencialPassword = credential.password;
	const credentialInfos = {
		...credential,
		password: encrypt(credencialPassword),
	};
	await credentialRepository.insertCredential(user.id, credentialInfos);
}

async function deleteCredential(user: User, credentialId: number) {
	await getCredential(user.id, credentialId);
	await credentialRepository.deleteCredential(credentialId);
}

const credentialService = {
	getCredential,
	getAllCredentials,
	createCredential,
	deleteCredential,
};

export default credentialService;
