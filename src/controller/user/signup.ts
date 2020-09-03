import * as express from 'express';
import argon2 from 'argon2';
import * as jsonwebtoken from 'jsonwebtoken';
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
    const payload = { id: user.uuid };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    // TODO make it descriptive
    res.status(500).json({ error: 'error' });
  }
});

module.exports = router;
