const express = require('express');
const routes = express.Router();

const user = require('../app/controllers/UserController');
const Validator = require('../app/validators/user');
const { itsNotAdmin } = require('../app/middlewares/session');

// users dashboard
routes.get('/', itsNotAdmin, user.index);
routes.get('/create', itsNotAdmin, user.create);
routes.get('/:id/edit', itsNotAdmin, Validator.isExist, user.edit);
routes.get('/profile', Validator.profile, user.profile);
routes.get('/profile/my-recipes', user.profileRecipe);

routes.post('/', itsNotAdmin, Validator.post, user.post);
routes.put('/profile', Validator.putProfile, user.putProfile);
routes.put('/', Validator.put, user.put);
routes.delete('/', user.delete);

module.exports = routes;