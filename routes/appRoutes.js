import passport from 'passport';
import '../config/passportJWTStrategy';
import authenticate from './authRoutes';
import {
  getAllProducts,
  postProduct,
  getProductById,
  getReviewByProduct,
  getAllUsers,
} from '../controllers/appController';

const routes = app => {
  app.route('/api/products')
    .get(passport.authenticate('jwt', {session: false}), getAllProducts)
    .post(passport.authenticate('jwt', {session: false}), postProduct);

  app.route('/api/products/:id')
    .get(passport.authenticate('jwt', {session: false}), getProductById);

  app.route('/api/products/:id/reviews')
    .get(passport.authenticate('jwt', {session: false}), getReviewByProduct);

  app.route('/api/users')
    .get(passport.authenticate('jwt', {session: false}), getAllUsers);

  app.use('/auth', authenticate);
};

export default routes;
