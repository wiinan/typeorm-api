import { getRepository } from "typeorm";
import { User } from "../entity/user";
import { sign } from "jsonwebtoken";

type UserRequest = {
  id: string;
  name: string;
  email: string;
  password: string;
};

class UserService {
  async store({ name, email, password }: UserRequest): Promise<User | Error> {
    const repo = getRepository(User);

    try {
      if (await repo.findOne({ email })) {
        return new Error("email ja existe");
      }

      const user = repo.create({ name, email, password });

      return await repo.save(user);
    } catch (err) {
      throw err;
    }
  }

  async login(data: any): Promise<Object> {
    try {
      const { email, password } = data;
      const repo = getRepository(User);
      const user = await repo.findOne({ email });
      if (!user) {
        return new Error("Usuario nao existe");
      }

      if (user.password !== password) {
        return new Error("Senha invalida");
      }

      const Token = sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      return { Token, user };
    } catch (err) {
      throw err;
    }
  }

  async index(id: string): Promise<User[] | User> {
    const repo = getRepository(User);

    if (id) return repo.findOne();

    return await repo.find();
  }

  async update(id: string, data: object): Promise<object | Error> {
    try {
      const repo = getRepository(User);
      const user = await repo.findOne(id);

      if (!user) return new Error("Usuario nao encontrado");

      await repo.update(id, data);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: object): Promise<object | Error> {
    try {
      const repo = getRepository(User);

      if (!(await repo.findOne(id))) {
        return new Error("Email nao existe!");
      }

      await repo.delete(id);

      return id;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
