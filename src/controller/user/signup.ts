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
  const desc = body.description;
  const { email } = body;
  const hashPw = await argon2.hash(password);
  try {
    const user = await User.create({
      username,
      email,
      description: desc,
      password: hashPw,
      isOauth: false
    }).save();

    // Make the token and send that
    const token = generateToken({ id: user.uuid });
    res.json({ token });
  } catch (err) {
    // TODO make it descriptive
    res.status(500).json({ error: 'error' });
  }
});

module.exports = router;
