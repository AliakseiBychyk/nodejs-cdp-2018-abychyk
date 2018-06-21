import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebookClientId, facebookClientSecret } from '../secret/facebook.json';

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || facebookClientId,
    clientSecret: process.env.FACEBOOK_APP_SECRET || facebookClientSecret,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
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
