import "reflect-metadata"
import express from "express";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/User";

// //routes
const user = require("./controller/user/user");
const snippets = require("./controller/snippets/snippets");
const login = require("./controller/user/login");
const signup = require("./controller/user/signup");
const forgot = require("./controller/user/forgot");

//entities 



const main = async () => {
  // connection to postgres database
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
  });
  // comment this line after running the program once
  await conn.runMigrations();

  const app = express();

  app.use("/api/snippets", snippets);
  app.use("/api/user", user);
  app.use("/api/login", login);
  app.use("/api/signup", signup);
  app.use("/api/forgot", forgot);

  app.listen("4000", () => {
    console.log("serverS started on localhost:4000");
  });
};

main();
