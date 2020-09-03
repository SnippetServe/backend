import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
// morgan
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';

// Entities
import Snippet from './entities/Snippet';
import User from './entities/User';

// Routes
const user = require('./controller/user/user');
const snippets = require('./controller/snippets/snippets');
const login = require('./controller/user/login');
const signup = require('./controller/user/signup');
const forgot = require('./controller/user/forgot');

const main = async () => {
  // Connect to postgres database
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Snippet]
  });

  const app = express();

  app.use(express.json());

  app.use('/api/snippets', snippets);
  app.use('/api/user', user);
  app.use('/api/login', login);
  app.use('/api/signup', signup);
  app.use('/api/forgot', forgot);

  /*
  Fix for:
  body-parser deprecated undefined extended: provide extended option dist/index.js:69:31
  */
  app.use(express.urlencoded({ extended: true }));

  // Use morgan
  app.use(morgan('dev'));

  // For 404 pages
  app.use((req, res) => {
    res.status(404).json({ status: '404' });
  });

  app.listen(parseInt(process.env.PORT, 10), () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on localhost:${process.env.PORT}`);
  });
};

main();
