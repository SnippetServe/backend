import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';

// morgan
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';

// Passport
import passport from 'passport';
import passportMiddleware from './middleware/passportMiddleware';

// Generic Controller Exception Middleware
import { serverError } from './middleware/errors';

// Entities
import Snippet from './entities/Snippet';
import User from './entities/User';

// Routes
const user = require('./controller/user/user');
const snippets = require('./controller/snippets/snippets');
const login = require('./controller/user/login');
const signup = require('./controller/user/signup');
const forgot = require('./controller/user/forgot');
const oauthRoutes = require('./controller/user/oauth');

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

  /*
  Fix for:
  body-parser deprecated undefined extended: provide extended option dist/index.js:69:31
  */
  app.use(express.urlencoded({ extended: true }));

  // Use morgan
  app.use(morgan('dev'));

  // Passport
  app.use(passportMiddleware.initialize());

  // use routes after every other middleware like passport has been added to express
  app.use(
    '/api/snippets',
    passport.authenticate('jwt', { session: false }),
    snippets
  );
  app.use('/api/user', user);
  app.use('/api/login', login);
  app.use('/api/signup', signup);
  app.use('/api/forgot', forgot);
  app.use(oauthRoutes);

  // Example to use JWT Protected routes
  app.get(
    '/secret',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const currentUser = req.user as User;
      res.json({ currentUser });
    }
  );

  // For 404 pages
  app.use((req, res) => {
    res.status(404).json({ status: '404' });
  });

  // The last custom middleware that wraps the exception as status 500 and returns
  // "Internal Server Error" if no exception message exists
  app.use(serverError);

  app.listen(+process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on localhost:${process.env.PORT}`);
  });
};

main();
