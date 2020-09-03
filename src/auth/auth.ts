import passport from 'passport';
import * as jwt from 'passport-jwt';

import User from '../entities/User';

export default function addJWT() {
  passport.use(
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      (payload, next) => {
        // Get the user
        const user = User.findOne(payload.id);
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      }
    )
  );
}
