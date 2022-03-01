// import "../middlewares/passportToken";
// import * as passport from "passport";
import { Request, Response } from "express";
import UserService from "../services/UserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const response = await UserService.store(req.body);

      return res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await UserService.login(req.body);

      return res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await UserService.index(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await UserService.update(id, req.body);

      return res.status(200).json({ "dados Atualizados": response });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await UserService.delete(req.params);

      return res.status(204).json({ status: true, deleted: response });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new CreateUserController();
