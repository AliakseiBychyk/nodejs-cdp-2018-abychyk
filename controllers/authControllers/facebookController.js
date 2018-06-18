import passport from 'passport';
import '../../config/passportFacebookStrategy';

export const facebookAuth = (req, res, next) => {
  passport.authenticate('facebook')(req, res, next);
};

export const facebookRedirect = (req, res, next) => {
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth',
  })(req, res, next);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
