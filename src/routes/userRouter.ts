import { Router } from "express";
import UserController from "../controller/CreateUserController";
import verifyToken from "../middlewares/token";
// import passportToken from "../middlewares/passportToken";
// import expressToken from "../middlewares/expressSession";

const routes = Router();

// routes.use(expressToken);
// routes.use(passportToken.initialize());
// routes.use(passportToken.session());

routes.post("/login", UserController.login);
routes.post("/user", UserController.handle);
routes.use(verifyToken)
routes.get("/user/:id?", UserController.index);
routes.delete("/user/:id", UserController.delete);
routes.put("/user/:id", UserController.update);

export default routes;
