const Recipe = require('../../models/Recipe');
const Chef = require('../../models/Chef');
const LoadChefService = require('../services/LoadChefService');

async function isExist(req, res, next) {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.render('dashboard/parts/not_found');
    }

    req.recipe = recipe;

    next();
  } catch (err) {
    return res.render('dashboard/parts/not_found');
  }
}

async function post(req, res, next) {
  const keys = Object.keys(req.body);
  const chefs = await LoadChefService.load('chefsAll');

  for (key of keys) {
    if (req.body[key] == '' && key != 'information' && key != 'id') {
      return res.render('dashboard/recipes/create', {
        chefs,
        error: 'Por favor, preencha todos os campos.',
        recipe: req.body
      });
    }
  }

  if (req.files.length == 0) {
    return res.render('dashboard/recipes/create', {
      chefs,
      recipe: req.body,
      error: 'Por favor, envie pelo menos uma imagem.'
    });
  }

  req.chefs = chefs;

  next();
}

async function put(req, res, next) {
  const { id } = req.body;
  const keys = Object.keys(req.body);
  const chefs = await LoadChefService.load('chefsAll');

  const currentRecipe = await Recipe.findByPk(id, {
    include: [
      { association: 'chefs', attributes: ['name'] },
      { association: 'files', through: 'recipe_files' }
    ]
  });
  for (key of keys) {
    if (req.body[key] == '' && key != 'removed_files' && key != 'information') {
      return res.render('dashboard/recipes/edit', {
        recipe: currentRecipe,
        chefs,
        error: 'Por favor preencha todos os campos.'
      });
    }
  }

  req.recipe = currentRecipe;
  req.chefs = chefs;
  next();
}

module.exports = {
  isExist,
  post,
  put
}