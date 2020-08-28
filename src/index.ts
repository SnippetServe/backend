import express from "express";
import * as bodyParser from "body-parser";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
const port = 5000;
import {AppRoutes} from "./routes";
import path from "path";

// //routes
// import {get} from './controller/Get'
// import {put} from './controller/Put'
// import {post} from './controller/Post'
// import {delet} from './controller/Delete'

var get = require('./controller/Get')
var put = require('./controller/Put')
var post = require('./controller/Post')
var delet = require('./controller/Delete')

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
const main = async () => {
    const conn = await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      logging: true,
      // synchronize: true,
      migrations: [path.join(__dirname, "./migrations/*")],
    //   entities: [Post, User, Updoot],
    });
    await conn.runMigrations();
  
    const app = express();

    app.use('/v1/get', get);
    app.use('/v1/put', put);
    app.use('/v1/delete', delet);
    app.use('/v1/post', post);
  
    app.listen("4000", () => {
      console.log("server started on localhost:4000");
    });
  };

main();

