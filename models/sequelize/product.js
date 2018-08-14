module.exorts = (sequelize, DataTypes) => {
  const Product = sequelize('product', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  });

  return Product;
};
