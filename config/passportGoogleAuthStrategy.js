import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { installed } from '../secret/google_client_secret.json';

const { client_id: googleClientID, client_secret: googleClientSecret } = installed;

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || googleClientID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || googleClientSecret,
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // `profile` will contain user profile information provided by Google
    console.log('\nprofile: \n\n', profile);
    console.log('\naccessToken: \n\n', accessToken);

    return done(null, profile._json, accessToken);
  })
);
