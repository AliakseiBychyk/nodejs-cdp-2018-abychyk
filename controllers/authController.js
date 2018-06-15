import passport from 'passport';
import jwt from 'jsonwebtoken';

export const postlogin = (req, res, next) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');

      return res.json({ user, token });
    });
  })(req, res);

};

export const logout = (req, res) => {
  res.send('logging out');
};

export const google = (req, res) => {
  res.send('logging in with Google');
};
