const session = require('express-session');
const Sequelize = require('sequelize');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
const db = require('./database');

const sequelize = new Sequelize(
  'des647hpi31vq8',
  'edongdognooiif',
  '15b86731cac72c7e10d441869437ed078841e05e8bad830ce24980cfbab9a99a', {
  dialect: 'postgres',
  storage: db,
});

module.exports = session({
  secret: 'kaaaameeeeraaaameeeeraaaaa',
  store: new sequelizeSession({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
})



