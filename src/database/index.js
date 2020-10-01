const Sequelize = require('sequelize');
const dataBase = require('../config/database');

const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');
const File = require('../models/File');
const User = require('../models/User');

const connection = new Sequelize(dataBase);

Recipe.init(connection);
Chef.init(connection);
File.init(connection);
User.init(connection);

Recipe.associate(connection.models);
Chef.associate(connection.models);
File.associate(connection.models);
User.associate(connection.models);

module.exports = connection;