import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import { errorsMiddleware } from "./middlewares/errorsMiddleware.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorsMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});
