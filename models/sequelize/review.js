module.exorts = (sequelize, DataTypes) => {
  const Review = sequelize('review', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    productId: DataTypes.INTEGER,
  });

  return Review;
};
