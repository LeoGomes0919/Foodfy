const Recipe = require('../../models/Recipe');
const File = require('../../models/File');
const fs = require('fs');

const LoadRecipeService = require('../services/LoadRecipeService');
const LoadChefService = require('../services/LoadChefService');

module.exports = {
  async index(req, res) {
    let { q = '', page, limit } = req.query;

    const recipesAll = await LoadRecipeService.load('recipesAll', q,
      'created_at', 'ASC', limit, page)

    if (page > recipesAll[1].total) {
      return res.redirect('/dashboard/recipes');
    }

    return res.render('dashboard/recipes/index', {
      recipes: recipesAll[0],
      pagination: recipesAll[1],
      q
    });
  },

  async show(req, res) {
    const findRecipe = req.recipe;

    try {
      const recipe = await LoadRecipeService.load('recipeFindOne', findRecipe.id);

      return res.render('dashboard/recipes/recipe_info', {
        recipe,
        image: recipe.files[0].path.replace('public', '')
      });
    } catch (err) {
      return res.redirect('/dashboard/recipes/');
    }
  },

  async create(req, res) {
    try {
      const chefs = await LoadChefService.load('chefsAll');
      return res.render('dashboard/recipes/create', {
        chefs
      });
    } catch (err) {
      return res.render('dashboard/recipes/create', {
        error: 'Houve um erro na execução da ação.'
      });
    }
  },

  async post(req, res) {
    const chefs = req.chefs;

    const {
      chef_id,
      title,
      ingredients,
      preparation,
      information,
    } = req.body;
    const { userId } = req.session;

    try {
      const recipe = await Recipe.create({
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        user_id: userId
      });
      await Promise.all(
        req.files.map(async ({
          originalname,
          path,
        }) => {
          const file = await File.create({
            name: originalname,
            path
          });
          return recipe.addFile(file);
        })
      );

      return res.redirect('/dashboard/recipes');
    } catch (err) {
      return res.render('dashboard/recipes/create', {
        chef: req.body,
        recipe: req.boy,
        chefs,
        error: 'Houve um erro no cadastro.'
      });
    }
  },

  async edit(req, res) {
    const findRecipe = req.recipe;
    try {
      const chefs = await LoadChefService.load('chefsAll');

      const recipe = await LoadRecipeService.load('recipeFindOne', findRecipe.id);
      return res.render('dashboard/recipes/edit', {
        recipe,
        chefs
      });
    } catch (err) {
      return res.render('dashboard/recipes/recipe_info', {
        error: 'Houve um erro ao tentar editar essa receita.'
      });
    }
  },

  async put(req, res) {
    const chefs = req.chefs;
    const {
      id,
      chef_id,
      title,
      ingredients,
      preparation,
      information,
    } = req.body;

    try {
      await Recipe.update({
        chef_id,
        title,
        ingredients,
        preparation,
        information
      }, {
        where: {
          id: id
        }
      });

      if (req.files.length != 0) {
        const currentRecipe = await LoadRecipeService.load('recipeFindOne', id);
        await Promise.all(
          req.files.map(async ({
            originalname,
            path,
          }) => {
            const file = await File.create({
              name: originalname,
              path
            });
            currentRecipe.addFile(file);
          })
        );
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',');
        removedFiles.splice(removedFiles.length - 1, 1);
        await Promise.all(
          removedFiles.map(async photoId => {
            const file = await File.findByPk(photoId)
            await file.destroy();
            fs.unlinkSync(file.path);
          })
        );
      }

      return res.redirect('/dashboard/recipes');
    } catch (err) {
      return res.render('dashboard/recipes/edit', {
        recipe: currentRecipe,
        chefs,
        error: 'Hover um erro na alteração da receita.'
      });
    }
  },

  async delete(req, res) {
    const { id } = req.body;
    let recipe = [];
    let chefs = []
    try {
      recipe = await LoadRecipeService.load('recipeFindOne', id);

      chefs = await LoadChefService.load('chefsAll');

      await Promise.all(
        recipe.files.map(async ({ id: idFile }) => {
          const file = await File.findByPk(idFile);

          recipe.removeFile(file);
          await file.destroy();
          fs.unlinkSync(file.path);
        })
      );
      await Recipe.destroy({
        where: {
          id: id
        }
      });
      return res.redirect('/dashboard/recipes');
    } catch (err) {
      return res.render('dashboard/recipes/edit', {
        recipe,
        chefs,
        error: 'Houve um erro ao tentar excluir essa receita.'
      });
    }
  },
}

