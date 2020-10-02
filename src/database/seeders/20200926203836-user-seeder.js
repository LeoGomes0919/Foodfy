'use strict';
const faker = require('faker');
const { hashSync } = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHas = hashSync('1234', 8);
    await queryInterface.bulkInsert('users', [{
      name: faker.name.firstName(),
      email: 'admin@foodfy.com.br',
      password: passwordHas,
      reset_token: '',
      reset_token_expires: '',
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null);
  }
};
