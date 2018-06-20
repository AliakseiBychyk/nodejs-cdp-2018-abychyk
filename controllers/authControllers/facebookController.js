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

    // when I implement this third callback argument, redirect doesn't occur
    // I have json data instead
    // when this callback is commented - redirect works as expected
    (err, user, token) => {
      if (err || !user) {
        return res.status(400).json({
          code: 400,
          message: 'Not Found',
          data: { user },
        });
      }
      console.log('\nuser', user);

      res.status(200).json({
        code: 200,
        message: 'OK',
        data: { user },
        token,
      });
    },

  )(req, res, next);


  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

};
