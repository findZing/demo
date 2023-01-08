'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasMany(models.Image, {foreignKey: 'imageId', as: 'images'})
      Product.belongsTo(models.Image, {foreignKey: 'imageId', targetKey: 'imageId', as: 'images'})

    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    imageId: DataTypes.STRING,
    store: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};