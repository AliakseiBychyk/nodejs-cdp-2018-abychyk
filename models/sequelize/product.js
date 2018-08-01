module.exorts = (sequelize, DataTypes) => {
  return sequelize('product', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  });
};
