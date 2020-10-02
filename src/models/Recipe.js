const { Model, DataTypes } = require('sequelize');

class Recipe extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.TEXT,
      ingredients: DataTypes.TEXT,
      preparation: DataTypes.TEXT,
      information: DataTypes.TEXT,
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Chef, {
      foreignKey: 'chef_id',
      as: 'chefs'
    });
    this.belongsToMany(models.File, {
      foreignKey: 'recipe_id',
      through: 'recipe_files',
      as: 'files'
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'users'
    })
  }
}

module.exports = Recipe;