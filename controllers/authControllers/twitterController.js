import passport from 'passport';
import '../../config/passportTwitterStrategy';

export const twitterAuth = (req, res, next) => {
  passport.authenticate('twitter')(req, res, next);
};

export const twitterRedirect = (req, res, next) => {
  passport.authenticate('twitter',

    /** easiest aproach */
    // {
    //   successRedirect: '/',
    //   failureRedirect: '/auth',
    // },

    // I'm gonna do the same with some improvements
    (err, user, token) => {
      if (err || !user) {
        return res.redirect('/auth');
      }
      // this code set `req.user = user` and then redirect
      req.login(user.name, err => {
        if (err) res.send(err);

        res.redirect('/');

        next();
      });
    },
  )(req, res, next);
};
