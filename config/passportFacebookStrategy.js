import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebookClientId, facebookClientSecret } from '../secret/facebook.json';

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || facebookClientId,
    clientSecret: process.env.FACEBOOK_APP_SECRET || facebookClientSecret,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    // `profile` will contain user profile information provided by Facebook
    console.log('\nprofile', profile);
    console.log('\naccessToken', accessToken);

    return cb(null, profile._raw);
  })
);
