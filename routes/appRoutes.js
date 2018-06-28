import passport from 'passport';
import '../config/passportJWTStrategy';
import authenticate from './authRoutes';
import {getAllCities, postCities} from '../controllers/citiesController';
import {
  getAllProducts,
  postProduct,
  getProductById,
  getReviewByProduct,
  getAllUsers,
} from '../controllers/appController';

const verify = passport.authenticate('jwt', { session: false });

const routes = app => {
  app.route('/api/products')
    .get(verify, getAllProducts)
    .post(verify, postProduct);

  app.route('/api/products/:id')
    .get(verify, getProductById);

  app.route('/api/products/:id/reviews')
    .get(verify, getReviewByProduct);

  app.route('/api/users')
    .get(verify, getAllUsers);

  app.route('/api/cities')
    .get(getAllCities)
    .post(postCities);

  app.use('/auth', authenticate);
};

export default routes;
