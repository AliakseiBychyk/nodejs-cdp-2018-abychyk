import passport from 'passport';
import '../../config/passportGoogleAuthStrategy';

export const googleAuth = (req, res, next) => {
  passport.authenticate('google',
    {
      scope: ['https://www.googleapis.com/auth/plus.login'],
    }
  )(req, res, next);
};

export const googleRedirect = (req, res, next) => {
  passport.authenticate('google',
    (err, user, token) => {
      if (err || !user) {
        return res.redirect('/auth');
      }
      console.log('user in auth: \n', user);

      res.redirect('/');
    }
  )(req, res, next);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
