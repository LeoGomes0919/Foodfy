const Chef = require('../../models/Chef');
const Recipe = require('../../models/Recipe');
const File = require('../../models/File');
const fs = require('fs');

const LoadChefService = require('../services/LoadChefService');

module.exports = {
  async index(req, res) {
    let chefs = [];
    try {
      chefs = await LoadChefService.load('chefsAll');

      return res.render('dashboard/chefs/index', {
        chefs
      });
    } catch (err) {
      return res.render('dashboard/chefs/index', {
        chefs,
        error: 'Houve um erro ao carregar a lista de chefs.'
      });
    }
  },

  async show(req, res) {
    const { id } = req.params;

    try {
      const chef = await LoadChefService.load('chefFindOne', id);

      const recipes = await Recipe.findAll({
        where: {
          chef_id: id
        },
        include: [
          { association: 'chefs', attributes: ['name'] },
          { association: 'files', through: 'recipe_files', attributes: ['path'] }
        ]
      });
      let total = await Recipe.count({
        where: {
          chef_id: id
        }
      });
      return res.render('dashboard/chefs/chef_info', {
        chef,
        recipes,
        total,
      });
    } catch (err) {
      return res.redirect('/dashboard/chefs');
    }
  },

  create(req, res) {
    return res.render('dashboard/chefs/create');
  },

  async edit(req, res) {
    const findChef = req.chef;

    try {
      const chef = await LoadChefService.load('chefFindOne', findChef.id);

      return res.render('dashboard/chefs/edit', {
        chef
      });
    } catch (err) {
      return res.render('dashboard/chefs/edit', {
        error: 'Houve um erro ao tentar editar esse chef.'
      });
    }
  },

  async post(req, res) {
    const file = req.file;
    try {
      const dataFile = {
        name: file.originalname,
        path: file.path,
      }
      const fileSave = await File.create({
        name: dataFile.name,
        path: dataFile.path,
      });

      const { name } = req.body;

      await Chef.create({
        name,
        file_id: fileSave.id,
      });
      return res.redirect('/dashboard/chefs');
    } catch (err) {
      return res.render('dashboard/chefs/create', {
        chef: req.body,
        error: 'Houve um erro no cadastro.'
      });
    }
  },

  async put(req, res) {
    const file = req.file;
    const currentChef = req.chef;
    const { id, name, id_file } = req.body;
    try {
      if (file) {
        const currentFile = await File.findByPk(id_file);
        fs.unlinkSync(currentFile.path);

        const dataFile = {
          name: file.originalname,
          path: file.path,
        }
        await File.update({
          name: dataFile.name,
          path: dataFile.path,
        }, {
          where: { id: id_file }
        });
      }

      await Chef.update({
        name,
        file_id: id_file,
      }, {
        where: { id: id }
      });
      return res.redirect('/dashboard/chefs');
    } catch (err) {
      return res.render('dashboard/chefs/edit', {
        chef: currentChef,
        error: 'Houve um erro na alteração do cadastro.'
      });
    }
  },

  async delete(req, res) {
    const { id, id_file } = req.body;
    let chef = [];
    try {
      chef = await LoadChefService.load('chefFindOne', id);
      await Chef.destroy({
        where: {
          id: id
        },
      });
      
      const currentFile = await File.findByPk(id_file);
      await File.destroy({
        where: {
          id: id_file
        }
      });
      fs.unlinkSync(currentFile.path);
      return res.redirect('/dashboard/chefs');
    } catch (err) {
      return res.render('dashboard/chefs/edit', {
        chef,
        error: 'O chef não pode ser excluído, existe receitas em seu nome.'
      });
    }
  }
}