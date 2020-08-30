import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import path from "path";
import "dotenv-safe/config"

//entities
import { User } from "./entities/User";
import { Snippet } from "./entities/Snippet";

//redis and session
import connectRedis from 'connect-redis'
import session from 'express-session'
import Redis from "ioredis";

//constants
import { __prod__, COOKIE_NAME } from "./constants";
import { Comment } from "./entities/Comment";


//routes
const user = require("./controller/user/user");
const snippets = require("./controller/snippets/snippets");
const login = require("./controller/user/login");
const signup = require("./controller/user/signup");
const forgot = require("./controller/user/forgot");


const main = async () => {
  // connection to postgres database
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Snippet, Comment],
  });
  //comment this line after running the program once
  //   await conn.runMigrations();

  const app = express();

  //redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 month
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".snippetserve.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded())

  app.use("/api/snippets", snippets);
  app.use("/api/user", user);
  app.use("/api/login", login);
  app.use("/api/signup", signup);
  app.use("/api/forgot", forgot);

  app.listen(parseInt(process.env.PORT), () => {
    console.log("Server started on localhost:4000");
  });
};

main();
