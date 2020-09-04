import * as express from 'express';
import argon2 from 'argon2';
import { generateToken } from '../../utils/jwtUtils';
import User from '../../entities/User';

const router = express.Router();

// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;

  const user = await User.findOne({
    where: { username },
    select: ['password', 'username', 'email', 'description']
  });
  if (!user) {
    res.json({ error: 'Incorrect Username/Password' });
  }
  const verifyPass = await argon2.verify(user.password, password);
  if (!verifyPass) {
    res.json({ error: 'Incorrect Username/Password' });
  } else {
    // Make the token and send that
    const token = generateToken({ id: user.uuid });
    res.json({ token });
  }

  // TODO delete once front end is able to make request (dont want the front end to access the user obv)
  res.json({ user });
});

module.exports = router;
