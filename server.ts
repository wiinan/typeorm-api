import * as express from "express";
import "./src";
import "reflect-metadata";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`running on ${port}`));
