const express = require('express');
const routes = express.Router();

const site = require('../app/controllers/SiteController');
const session = require('../app/controllers/SessionController');
const SessionValidator = require('../app/validators/session');
const { onlyUsers, autheticated } = require('../app/middlewares/session');

const users = require('./user');
const recipes = require('./recipe');
const chefs = require('./chef');

// session
routes.get('/login', autheticated, session.loginForm);
routes.get('/login/forget-password', autheticated, session.forgetPassword);
routes.get('/login/reset-password', autheticated, session.resetPassword);

routes.post('/login', SessionValidator.login, session.login);
routes.post('/logout', session.logout);

routes.post('/login/forget-password', SessionValidator.forgot, autheticated, session.forgot);
routes.post('/login/reset-password', SessionValidator.reset, autheticated, session.reset);


// site foodfy
routes.get('/', site.index);
routes.get('/about', site.about);
routes.get('/recipes', site.list);
routes.get('/recipes/:id', site.show);
routes.get('/chefs', site.chef);

routes.use('/dashboard/recipes', onlyUsers, recipes);
routes.use('/dashboard/chefs', onlyUsers, chefs);
routes.use('/dashboard/users', onlyUsers, users);

routes.use('/dashboard/*', (req, res) => {
  res.status(404).render('dashboard/parts/not_found');
});

routes.use('/', (req, res) => {
  res.status(404).render('site/parts/not_found');
});

module.exports = routes;