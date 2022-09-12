import { Credential } from "@prisma/client";
import { Request, Response } from "express";
import credentialService from "../services/credentialService.js";

export async function getAllCredentials(req: Request, res: Response) {
	const { user } = res.locals;
	const credencials: Credential[] = await credentialService.getAllCredentials(
		user.id
	);
	return res.status(200).send(credencials);
}

export async function getCredential(req: Request, res: Response) {
	const { user } = res.locals;
	const credentialId = parseInt(req.params.id);
	//verify params is a number
	if (isNaN(credentialId)) {
		return res.status(422).send("params is not a number");
	}

	const credential = await credentialService.getCredential(
		user.id,
		credentialId
	);
	return res.status(200).send(credential);
}

export async function createCredential(req: Request, res: Response) {
	const { user } = res.locals;
	const credential = req.body;

	await credentialService.createCredential(user, credential);
	return res.sendStatus(201);
}

export async function deleteCredential(req: Request, res: Response) {
	const credentialId = parseInt(req.params.id);
	if (isNaN(credentialId)) {
		return res.status(422).send("params is not a number");
	}

	const { user } = res.locals;
	await credentialService.deleteCredential(user, credentialId);
	return res.status(200).send("Deleted!");
}
