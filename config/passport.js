import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
  },
  (login, password, cb) => {

    const hardcodedUser = { login: 'Rambo', password: '123456' };

    console.log('harcodedUser', hardcodedUser.login, hardcodedUser.password);
    console.log('user', login, password);

    return (login === hardcodedUser.login && password === hardcodedUser.password)
      ? cb(null, hardcodedUser, {message: 'Logged In Successfully'})
      : cb(null, false, {message: 'Incorrect login or password'});
  })
);
