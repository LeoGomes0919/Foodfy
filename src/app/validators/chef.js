const Chef = require('../../models/Chef');
const LoadChefService = require('../services/LoadChefService');

async function isExist(req, res, next) {
  try {
    const { id } = req.params;

    const chef = await LoadChefService.load('chefFindOne', id);

    if (!chef) {
      return res.render('dashboard/parts/not_found');
    }

    req.chef = chef;
    next();
  } catch (err) {
    return res.render('dashboard/parts/not_found');
  }
}

async function post(req, res, next) {
  const keys = Object.keys(req.body);
  const file = req.file;
  for (key of keys) {
    if (req.body[key] == '' && key != 'id') {
      return res.render('dashboard/chefs/create', {
        chef: req.body,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }

  if (!file) {
    return res.render('dashboard/chefs/create', {
      chef: req.body,
      error: 'Por favor, escolha uma imagem para o chef'
    });
  }

  req.file = file;

  next();
}

async function put(req, res, next) {
  const { id } = req.body;
  const keys = Object.keys(req.body);
  const file = req.file;
  let currentChef = await LoadChefService.load('chefFindOne', id);
  
  for (key of keys) {
    if (req.body[key] == '' && key != 'id_file' && key != 'avatar') {
      return res.render('dashboard/chefs/edit', {
        chef: currentChef,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }

  req.file = file;
  req.chef = currentChef;

  next();
}

module.exports = {
  isExist,
  post,
  put
}