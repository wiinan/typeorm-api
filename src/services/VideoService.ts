import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { Video } from "../entity/video";

type VideoRequest = {
  id: string;
  name: string;
  duration: number;
  user_id: string;
};

class VideoService {
  async store(
    user_id: string,
    { name, duration }: VideoRequest
  ): Promise<Error | Video> {
    const repo = getRepository(Video);
    const repoUser = getRepository(User);

    if (!(await repoUser.findOne(user_id))) {
      return new Error("Usuario nao existe");
    }

    const video = repo.create({ name, duration, user_id });
    return await repo.save(video);
  }

  async index(user_id: string): Promise<any | Video> {
    const repo = getRepository(Video);
    const repoUser = getRepository(User);
    if (user_id) {
      return await repo.findOne(user_id);
    }

    return await repo.find({
      relations: ["user"],
    });
  }
}

export default new VideoService();
