module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    job: DataTypes.STRING,
    address: DataTypes.STRING,
  });
};

