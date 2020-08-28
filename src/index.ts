import express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
const port = 5000;
import path from "path";

// //routes
var user = require("./controller/user/user");
var snippets = require("./controller/snippets/snippets");
var login = require("./controller/user/login");
var signup = require("./controller/user/signup");
var forgot = require("./controller/user/forgot");

const main = async () => {
  //connection to postgres database
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    //   entities: [Post, User, Updoot],
  });
  //comment this line after running the program once
  await conn.runMigrations();

  const app = express();

  app.use("/api/snippets", snippets);
  app.use("/api/user", user);
  app.use("/api/login", login);
  app.use("/api/signup", signup);
  app.use("/api/forgot", forgot);

  app.listen("4000", () => {
    console.log("server started on localhost:4000");
  });
};

main();
