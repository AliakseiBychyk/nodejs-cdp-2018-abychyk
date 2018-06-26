import passport from 'passport';
import '../../config/passportFacebookStrategy';

export const facebookAuth = (req, res, next) => {
  passport.authenticate('facebook')(req, res, next);
};

export const facebookRedirect = (req, res, next) => {
  passport.authenticate('facebook',
    {
      successRedirect: '/',
      failureRedirect: '/auth',
    },
    (err, user, token) => {
      if (err) res.send(err);

      req.login(user, err => {
        if (err) res.send(err);

        res.redirect('/');
      });
    }
  )(req, res, next);
};
