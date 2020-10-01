const LoadRecipeService = require('../services/LoadRecipeService');
const LoadChefService = require('../services/LoadChefService');

module.exports = {
  async index(req, res) {
    let { q = '', page, limit } = req.query;

    const recipesAll = await LoadRecipeService.load('recipesAll', q,
      'created_at', 'ASC', limit, page);

    if (page > recipesAll[1].total) {
      return res.redirect('/');
    }

    return res.render('site/index', {
      recipes: recipesAll[0],
      pagination: recipesAll[1],
      q
    });
  },

  async list(req, res) {
    let { q = '', page, limit } = req.query;

    const recipesAll = await LoadRecipeService.load('recipesAll', q,
      'updated_at', 'DESC', limit, page);

    if (page > recipesAll[1].total) {
      return res.redirect('/recipes');
    }

    return res.render('site/recipes', {
      recipes: recipesAll[0],
      pagination: recipesAll[1],
      q
    });

  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const recipe = await LoadRecipeService.load('recipeFindOne', id);

      return res.render('site/recipe_info', {
        recipe,
        image: recipe.files[0].path.replace('public', ''),
      });
    } catch (err) {
      console.error();
      return res.render('site/parts/not_found');
    }
  },

  about(req, res) {
    return res.render('site/about');
  },

  async chef(req, res) {
    try {
      const chefs = await LoadChefService.load('chefFindAllCount');
      return res.render('site/chefs', { chefs });
    } catch (err) {
      console.error(err);
      return res.redirect('/');
    }
  },
}
