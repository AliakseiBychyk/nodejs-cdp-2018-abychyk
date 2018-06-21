import passport from 'passport';
import '../../config/passportTwitterStrategy';

export const twitterAuth = (req, res, next) => {
  passport.authenticate('twitter')(req, res, next);
};

export const twitterRedirect = (req, res, next) => {
  passport.authenticate('twitter',
    // {
    //   successRedirect: '/',
    //   failureRedirect: '/auth',
    // },

    // I'm gonna do the same with some improvements
    (err, user, token) => {
      if (err || !user) {
        return res.redirect('/auth');
      }
      console.log('\nuser.name in auth:', user.name);

      req.login(user.name, err => {
        if (err) res.send(err);

        console.log('req.user', req.user);

        res.redirect('/');

        next();
      });
    },
  )(req, res, next);
};
