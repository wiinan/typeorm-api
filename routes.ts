import { Router } from "express";
import userRouter from "./src/routes/userRouter";
import VideoRouter from "./src/routes/videoRouter";

const routes = Router();

routes.use("/api", userRouter);
routes.use("/api", VideoRouter);

export { routes };
