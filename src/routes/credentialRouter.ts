import { Router } from "express";
import {
	createCredential,
	deleteCredential,
	getAllCredentials,
	getCredential,
} from "../controllers/credentialController.js";
import { authValidator } from "../middlewares/authValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { credentialSchema } from "../schemas/credentialShema.js";

const credentialRouter = Router();

credentialRouter.get("/credentials", authValidator, getAllCredentials);
credentialRouter.get("/credentials/:id", authValidator, getCredential);
credentialRouter.post(
	"/credentials",
	authValidator,
	schemaValidator(credentialSchema),
	createCredential
);
credentialRouter.delete("/credentials/:id", authValidator, deleteCredential);
