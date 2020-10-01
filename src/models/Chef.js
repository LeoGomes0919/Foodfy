const {Model, DataTypes} = require('sequelize');

class Chef extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.TEXT
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Recipe, {
      foreignKey: 'chef_id', 
      as: 'recipes'
    });
    this.belongsTo(models.File, {
      foreignKey: 'file_id',
      as: 'files'
    });
  }
}

module.exports = Chef;