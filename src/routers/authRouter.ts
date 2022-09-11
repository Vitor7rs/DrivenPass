import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { userSchema } from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("signin", schemaValidator(userSchema), signIn);
authRouter.post("signup", schemaValidator(userSchema), signUp);

export default authRouter;
