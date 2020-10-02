const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.TEXT,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      reset_token: DataTypes.TEXT,
      reset_token_expires: DataTypes.TEXT,
      is_admin: DataTypes.BOOLEAN,
    }, {
      sequelize
    });
  }
  static associate(models) {
    this.hasMany(models.Recipe, {
      foreignKey: 'user_id',
      as: 'recipes'
    })
  }
}

module.exports = User;