const express = require('express');
const routes = express.Router();

const multer = require('../app/middlewares/multer');
const chef = require('../app/controllers/ChefController');
const { itsNotAdmin } = require('../app/middlewares/session');
const Validator = require('../app/validators/chef');

// chefs dashboard
routes.get('/', chef.index);
routes.get('/create', itsNotAdmin, chef.create);
routes.get('/:id', Validator.isExist, chef.show);
routes.get('/:id/edit', Validator.isExist, itsNotAdmin, chef.edit);

routes.post('/', multer.single('avatar'), itsNotAdmin, Validator.post, chef.post);
routes.put('/', multer.single('avatar'), itsNotAdmin, Validator.put, chef.put);
routes.delete('/', itsNotAdmin, chef.delete);

module.exports = routes;