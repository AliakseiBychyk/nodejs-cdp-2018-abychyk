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
    .get(getAllProducts)
    .post(postProduct);

  app.route('/api/products/:id')
    .get(getProductById);

  app.route('/api/products/:id/reviews')
    .get(getReviewByProduct);

  app.route('/api/users')
    .get(getAllUsers);

  app.use('/auth', authenticate);
};

export default routes;
