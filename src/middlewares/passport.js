import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import dotenv from 'dotenv';

import { getLoginUser } from '../dataaccess/auth.js';

dotenv.config();

passport.use(
  new JWTstrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromHeader('token'),
  }, async (token, done) => {
    try {
      const currentUser = getLoginUser(token.correo);

      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);

export default passport;
