const express = require('express');
const routes = express.Router();

const multer = require('../app/middlewares/multer');
const recipe = require('../app/controllers/RecipeController');
const { notAllowedEditUserRecipe } = require('../app/middlewares/session');
const Validator = require('../app/validators/recipe');

// recipes dashboard
routes.get('/', recipe.index);
routes.get('/create', recipe.create);
routes.get('/:id', Validator.isExist, recipe.show);
routes.get('/:id/edit', Validator.isExist, notAllowedEditUserRecipe, recipe.edit);

routes.post('/', multer.array('image'), Validator.post, recipe.post);
routes.put('/', multer.array('image'), Validator.put, recipe.put);
routes.delete('/', recipe.delete);

module.exports = routes;
