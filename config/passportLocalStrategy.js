import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
  },
  (login, password, cb) => {

    // here I implemented hardcoded user without inquiry to db
    // just to prove login procedure
    const hardcodedUser = { login: 'Rambo', password: '123456' };

    return (login === hardcodedUser.login && password === hardcodedUser.password)
      ? cb(null, hardcodedUser, {message: 'Logged In Successfully'})
      : cb(null, false, {message: 'Incorrect login or password'});
  })
);
