const { Model, DataTypes } = require('sequelize');

class File extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.TEXT,
      path: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: 'files'
    });
  }

  static associate(models) {
    this.belongsToMany(models.Recipe, {
      foreignKey: 'file_id',
      through: 'recipe_files',
      as: 'recipes'
    });
    this.hasOne(models.Chef, {
      foreignKey: 'file_id',
      as: 'chefs'
    });
  }
}

module.exports = File;