'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chef_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chefs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
          return this.getDataValue("ingredients").split(";")
        },
        set(val) {
          this.setDataValue("ingredients", val.join(";"));
        },
      },
      preparation: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
          return this.getDataValue("preparation").split(";")
        },
        set(val) {
          this.setDataValue("preparation", val.join(";"));
        },
      },
      information: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recipes');
  }
};
