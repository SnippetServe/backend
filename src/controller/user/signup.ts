import * as express from 'express';
// import argon2 from 'argon2';
// import User from '../../entities/User';

const router = express.Router();

// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  // const { body } = req;
  // const { username } = body;
  // const { password } = body;
  // const desc = body.description;
  // const { email } = body;
  // const { type } = body;
  // const { from } = body;
  // let isOauth;

  // starting signup from scratch

  // TODO delete once front end is able to make request (dont want the front end to access the user obv)
  // res.json({ user });
  res.json({ hi: 'h' });
  // to remove eslint error
  console.log(req);
});

module.exports = router;
