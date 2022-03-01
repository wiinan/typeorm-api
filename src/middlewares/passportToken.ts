import { Request } from "express";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getRepository } from "typeorm";
import { User } from "../entity/user";

type PassportRequest = {};

passport.serializeUser((req, user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  const repo = getRepository(User);
  try {
    const user = await repo.findOne(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const repo = getRepository(User);

      const user = await repo.findOne({ email });

      if (!user) done(null, false);

      done(null, user);
    }
  )
);

export default passport;
