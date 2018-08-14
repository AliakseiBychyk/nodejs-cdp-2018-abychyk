const Models = require('../models/sequelize');

const models = Models();

export async function getAll() {
  return models.Product.findAll({ where: {}});
}

export async function getOne(productId) {
  return models.Product.findAll({
    where: {
      id: productId,
    },
  });
}

export async function create(data) {
  const product = models.Product.build({
    data,
  });
  return product.save();
}

export async function getReviewByProduct(productId) {
  return models.Product.findAll({
    include: [{
      model: models.Review,
      where: {
        id: productId,
      },
    }],
  });
}

export async function removeOne(productId) {
  return models.Product.remove({
    where: {
      id: productId,
    },
  });
}
