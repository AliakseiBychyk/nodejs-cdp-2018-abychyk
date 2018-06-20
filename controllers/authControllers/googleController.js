import passport from 'passport';
import '../../config/passportGoogleAuthStrategy';

export const googleAuth = (req, res, next) => {
  passport.authenticate('google',
    {
      // scope: ['https://www.googleapis.com/auth/plus.login'], // additional form requested access to account
      scope: ['profile'],
    }
  )(req, res, next);
};

export const googleRedirect = (req, res, next) => {
  passport.authenticate('google',
    (err, user, token) => {
      if (err || !user) {
        return res.redirect('/auth');
      }
      console.log('\nuser in auth:', user.displayName);

      req.login(user.displayName, { session: false }, err => {
        if (err) res.send(err);

        console.log('req.user', req.user);

        res.redirect('/');

        next();
      });
    },

  )(req, res, next);
};
