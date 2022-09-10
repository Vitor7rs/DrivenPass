import { Router } from "express";
import { login } from "./authRouter";

const router = Router();

router.use("/", login);

export default router;
