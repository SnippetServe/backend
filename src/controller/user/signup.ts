import * as express from 'express';
import argon2 from 'argon2';
import User from '../../entities/User';

const router = express.Router();

// get route
router.post('/', async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;
  const desc = body.description;
  const { email } = body;
  const { isOauth } = body;

  let user;
  if (isOauth) {
    console.log('OAuth');
  } else {
    if (password.length <= 2) {
      res.json({ error: 'Password too short' });
    }

    const hashedPassword = await argon2.hash(password);

    try {
      const result = await User.create({
        username,
        email,
        password: hashedPassword,
        description: desc
      }).save();
      user = result;
    } catch (err) {
      console.log(err);
      if (err.code === '23505') {
        res.json({ error: 'Username taken' });
      }
    }
  }

  // TODO uncomment once front end is able to make request (this is will create a session for the user)
  // req.session.userId = user.uniqueid

  // TODO delete once front end is able to make request (dont want the front end to access the user obv)
  res.json({ user });
});

module.exports = router;
