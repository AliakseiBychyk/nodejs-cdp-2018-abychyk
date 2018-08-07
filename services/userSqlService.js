const Models = require('../models/sequelize');

const models = Models();

export async function getAll() {
  return models.User.findAll({ where: {}});
}

