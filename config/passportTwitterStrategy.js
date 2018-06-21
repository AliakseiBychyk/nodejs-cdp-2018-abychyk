import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { twitterConsumerKey, twitterConsumerSecret } from '../secret/twitter.json';

passport.use(
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || twitterConsumerKey,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || twitterConsumerSecret,
    callbackURL: 'http://localhost:8080/auth/twitter/callback',
  },
  (token, tokenSecret, profile, done) => {
    // `profile` will contain user profile information provided by Twitter
    console.log('\nprofile._json: \n\n', profile._json);
    console.log('\naccessToken: \n\n', token);

    return done(null, profile._json, token);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
