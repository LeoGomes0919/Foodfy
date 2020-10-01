const session = require('express-session');
const Sequelize = require('sequelize');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
const db = require('./database');

const sequelize = new Sequelize(
  'ddasqhqv0b8092', 
  'fubaapjorqhcph', 
  'bdb52a8a0ad4f36712c10de4385bda4fb9eeda8f03af4b8a20445c24ee31c1c3', {
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



