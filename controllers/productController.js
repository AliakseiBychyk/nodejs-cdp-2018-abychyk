import productService from '../services/productService';

export const getAllProducts = (req, res) => {
  // some logic should be implemented here
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Products go here');
};

export const postProduct = (req, res) => {
  // some logic should be implemented here
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('You write new product here');
};

export const getProductById = (req, res) => {
  // some logic should be implemented here
  const id = req.params.id;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`You retrieve product by id=${id} here`);
};

export const getReviewByProduct = (req, res) => {
  // some logic should be implemented here
  const id = req.params.id;
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`All reviews by product with id=${id} go here`);
};

export const deleteProductById = (req, res) => {
  res.end();
};
