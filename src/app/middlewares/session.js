const Recipe = require('../../models/Recipe');

function onlyUsers(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
}

async function autheticated(req, res, next) {
  const { userId } = req.session;
  const findUser = await Recipe.findByPk(userId);
  if (userId) {
    return res.redirect('dashboard/users/profile');
  }
  if(userId) {
    if(!findUser) {
      return res.redirect('/login');
    }
  }
  next();
}

function itsNotAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.render('dashboard/parts/access_denied');
  }

  next();
}

async function notAllowedEditUserRecipe(req, res, next) {
  const { id } = req.params;
  const recipe = await Recipe.findByPk(id);
  if (req.session.userId != recipe.user_id) {
    return res.render('dashboard/parts/access_denied');
  }

  next();
}

module.exports = {
  onlyUsers,
  autheticated,
  itsNotAdmin,
  notAllowedEditUserRecipe
}