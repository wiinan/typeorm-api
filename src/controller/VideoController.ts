import { Request, Response } from "express";
import VideoService from "../services/VideoService";

class VideoController {
  async store(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const response = await VideoService.store(user_id, req.body);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const response = await VideoService.index(user_id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new VideoController();
