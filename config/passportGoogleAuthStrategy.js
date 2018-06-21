import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { installed } from '../secret/google_client_secret.json';

const { client_id, client_secret, redirect_uris } = installed;

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || client_id,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || client_secret,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || redirect_uris[1], // 'http://localhost:8080/auth/google/callback',
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
