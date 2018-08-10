const Models = require('../models/sequelize');

const models = Models();

export async function getAll() {
  return models.Product.findAll({ where: {}});
}

export async function getOne(userId) {
  return models.Product.findAll({
    where: {
      id: userId,
    },
  });
}

export async function create(data) {
  const product = models.Product.build({
    data,
  });
  return product.save();
}
