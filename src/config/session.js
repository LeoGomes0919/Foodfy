const session = require('express-session');
const Sequelize = require('sequelize');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
const db = require('./database');

const sequelize = new Sequelize('kpmscsoh', 'kpmscsoh', 'gnXc49STGiXCuzbVLrZtkp96E2qNDrLF', {
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



