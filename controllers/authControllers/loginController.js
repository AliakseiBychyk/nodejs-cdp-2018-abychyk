import passport from 'passport';
import jwt from 'jsonwebtoken';

const login = (req, res, next) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err || !user) {
      return res.status(400).json({
        code: 400,
        message: 'Not Found',
        data: { user },
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');

      return res.status(200).json({
        code: 200,
        message: 'OK',
        data: { user },
        token,
      });

    });
  })(req, res);

};

export default login;
