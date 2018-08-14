import {
  getAll,
  getOne,
  getReviews,
  create,
  removeOne,
} from '../services/productService';
import { runInNewContext } from 'vm';


export const getAllProducts = async(req, res, next) => {
  try {
    const products = await getAll();
    return res.json(products);
  } catch (err) {
    return next(err);
  }
};

export const postProduct = async(req, res) => {
  try {
    const product = req.body;
    await create(product);
    return res.redirect(`/api/products/${product.id}`);
  } catch (err) {
    console.log(err);
    return res.redirect('api/products');
  }
};

export const getProductById = async(req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await getOne(productId);
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

export const getReviewByProduct = async(req, res, next) => {
  try {
    const productId = req.params.id;
    const reviews = await getReviews(productId);
    return res.json(reviews);
  } catch (err) {
    return next(err);
  }
};

export const deleteProductById = async(req, res) => {
  try {
    const deleteResult = await removeOne(req.params.id);
    if (deleteResult.n === 0) {
      throw new Error('Result returned zero deleted products');
    }
    console.log('Successfully deleted');
    return res.redirect('/api/products');
  } catch (err) {
    console.log(err);
    return res.redirect('api/products');
  }
};
