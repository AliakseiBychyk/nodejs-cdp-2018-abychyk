import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import {
  facebookClientId,
  facebookClientSecret,
  facebookCallbackUri,
} from '../secret/facebook.json';

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || facebookClientId,
    clientSecret: process.env.FACEBOOK_APP_SECRET || facebookClientSecret,
    callbackURL: process.env.FACEBOOK_CALLBACK_URI || facebookCallbackUri,
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile._json, accessToken);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
