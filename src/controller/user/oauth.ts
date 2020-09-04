import express, { Request, Response } from 'express';
import passport from 'passport';
import { GITHUB, GOOGLE } from '../../config/oauthConfig';
import { generateToken } from '../../utils/jwtUtils';

const router = express.Router();

router.get('/oauthRedirect', (req: Request, res: Response) => {
  const { token } = req.query;
  return res.json({ token, token_type: 'Bearer', expires_in: 24 * 60 * 60 });
});

router.get('/auth/github', passport.authenticate('github'));

router.get(
  GITHUB.callbackURL,
  passport.authenticate('github', { session: false }),
  (req: Request, res: Response) => {
    // eslint-disable-next-line prefer-destructuring
    const user: any = req.user;
    const token = generateToken({ id: user.uuid }, { expiresIn: 24 * 60 * 60 });
    // redirect from here to hide the callback code, recheck logic or research more
    return res.redirect(`/oauthRedirect?token=${token}`);
  }
);

router.get('/auth/google', passport.authenticate('google', { session: false }));

router.get(
  GOOGLE.callbackURL,
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  (req: Request, res: Response) => {
    // eslint-disable-next-line prefer-destructuring
    const user: any = req.user;
    const token = generateToken({ id: user.uuid }, { expiresIn: 24 * 60 * 60 });
    return res.redirect(`/oauthRedirect?token=${token}`);
  }
);

module.exports = router;
