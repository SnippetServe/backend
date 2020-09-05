import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import * as jwt from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as express from 'express';
import { GITHUB, GOOGLE } from '../config/oauthConfig';
import User from '../entities/User';

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB.clientID,
      clientSecret: GITHUB.clientSecret,
      callbackURL: GITHUB.callbackURL,
      scope: ['user:email']
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      next: Function
    ) => {
      const { username, emails } = profile;
      // TODO error handling on email, check if emails[0] is not null/empty etc
      const email = emails[0].value;
      // check if user already exists
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        // already have the user -> return login
        return next(null, currentUser);
      }
      const newUser = await User.create({
        username,
        isOauth: true,
        email
      }).save();
      return next(null, newUser);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: GOOGLE.callbackURL,
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      next: Function
    ) => {
      const { displayName: username, emails } = profile;
      // TODO error handling on email, check if emails[0] is not null/empty etc
      const email = emails[0].value;
      // check if user already exists
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        // already have the user -> return login
        return next(null, currentUser);
      }
      const newUser = await User.create({
        username,
        isOauth: true,
        email
      }).save();
      return next(null, newUser);
    }
  )
);

passport.use(
  new jwt.Strategy(
    {
      jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    },
    async (req: express.Request, payload: any, next: any) => {
      // Get the user

      const user = await User.findOne(payload.id);
      if (user) {
        req.user = user;
        return next(null, user);
      }
      return next(null, false);
    }
  )
);

export default passport;
