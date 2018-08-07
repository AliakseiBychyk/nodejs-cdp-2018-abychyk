module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    job: DataTypes.STRING,
    address: DataTypes.STRING,
  });

  return User;
};

