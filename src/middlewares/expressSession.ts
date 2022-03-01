import * as expressSession from "express-session";
import { Request, Response, NextFunction } from "express";

const passportToken = (req: Request, res: Response, next: NextFunction) => {
  return expressSession({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
  (req, res, next);
};

export default passportToken;
