import passport from 'passport';
import '../config/passportJWTStrategy';
import authenticate from './authRoutes';
import {
  getAllCities,
  postCities,
  updateCityById,
  deleteCityById,
} from '../controllers/citiesController';
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} from '../controllers/userController';
import {
  getAllProducts,
  postProduct,
  getProductById,
  getReviewByProduct,
  deleteProductById,
} from '../controllers/productController';

/**
 * should be authorized by `Authorization` header with token:
 *
 * Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlJhbWJvIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1Mjk1ODEwNjd9.x-1GPKF5tu41UaLcYpS_daqPXHJ3gzM_7XSaXnz4zlE  eslint-disable-line max-len
 *
 * or simply change to mock authorization middleware commented below:
 */
const verify = passport.authenticate('jwt', { session: false });
// const verify = (req, res, next) => next();

const routes = app => {
  app.route('/api/products')
    .get(verify, getAllProducts)
    .post(verify, postProduct);

  app.route('/api/products/:id')
    .get(verify, getProductById)
    .delete(verify, deleteProductById);

  app.route('/api/products/:id/reviews')
    .get(verify, getReviewByProduct);

  app.route('/api/users')
    .post(verify, createUser)
    .get(verify, getAllUsers);

  app.route('/api/users/:id')
    .get(verify, getUserById)
    .delete(verify, deleteUserById);

  app.route('/api/cities')
    .get(getAllCities)
    .post(postCities);

  app.route('/api/cities/:name')
    .put(updateCityById)
    .delete(deleteCityById);

  app.use('/auth', authenticate);
};

export default routes;
