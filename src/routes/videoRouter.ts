import { Router } from "express";
import VideoController from "../controller/VideoController";

const routes = Router();

routes.post("/video/:user_id", VideoController.store);
routes.get("/video/:user_id?", VideoController.index);

export default routes;
