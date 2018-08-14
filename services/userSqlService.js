const Models = require('../models/sequelize');

const models = Models();

export async function getAll() {
  return models.User.findAll({ where: {}});
}

export async function getOne(userId) {
  return models.User.findAll({
    where: {
      id: userId,
    },
  });
}
