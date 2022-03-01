import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  req.method === "OPTION" ?? next();

  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).json({ err: "Não authenticado" });
    }

    const tokenVerify = verify(token, process.env.JWT_SECRET);

    if (!tokenVerify) {
      return res.status(400).json("Usuario nao autenticado");
    }

    req.currentUser = tokenVerify;

    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

export default verifyToken;
