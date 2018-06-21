import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';


passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my_super_jwt_secret',
  },
  (jwt_payload, done) => {

    console.log('jwt_payload', jwt_payload);
    const hardcodedUser = { login: 'Rambo', password: '123456' };

    return (
      jwt_payload.login === hardcodedUser.login
      && jwt_payload.password === hardcodedUser.password
    )
      ? done(null, hardcodedUser)
      : done(null, false);
  })
);
