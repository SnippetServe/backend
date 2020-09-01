import * as express from 'express';
import argon2 from 'argon2';
import {User} from '../../entities/User';

const router = express.Router();

// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;

  const user = await User.findOne({ username });
  if (!user) {
    res.send('User not found');
  }
  const verifyPass = await argon2.verify(user.password, password);
  if (!verifyPass) {
    res.send('Incorrect Username/Password');
  }

  // TODO uncomment once front end is able to make request (this is will create a session for the user)
  // req.session.userId = user.uniqueid

  // TODO delete once front end is able to make request (dont want the front end to access the user obv)
  res.send(user);
});

module.exports = router;
