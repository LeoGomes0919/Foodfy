const Recipe = require('../../models/Recipe');
const { Op } = require('sequelize');

const LoadService = {
  load(service, filter, order, classification, limit, page) {
    this.order = order
    this.limit = limit
    this.filter = filter
    this.page = page
    this.classification = classification
    return this[service]()
  },

  async recipeFindOne() {
    try {
      const recipe = await Recipe.findByPk(this.filter, {
        include: [
          { association: 'chefs', attributes: ['name', 'id'] },
          { association: 'users', attributes: ['name', 'id'] },
          {
            association: 'files',
            through: 'recipe_files',
            attributes: ['id', 'name', 'path']
          },
        ]
      });
      
      return recipe;
    } catch (err) {
      throw Error(err);
    }
  },

  async recipesAll() {
    try {
      this.page = this.page || 1;
      this.limit = this.limit || 6;
      let offset = this.limit * (this.page - 1);

      if (this.filter) {
        this.filter = this.filter;
      }

      const recipeTotal = await Recipe.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: `%${this.filter}%`
          }
        },
      });

      const recipes = await Recipe.findAll({
        include: [
          { association: 'chefs', attributes: ['id', 'name'] },
          {
            association: 'files',
            through: 'recipe_files',
            attributes: ['name', 'path']
          },
        ],
        where: {
          title: {
            [Op.iLike]: `%${this.filter}%`
          }
        },
        limit: this.limit,
        offset: offset,
        order: [
          [`${this.order}`, `${this.classification}`]
        ]
      });

      const pagination = {
        total: Math.ceil(recipeTotal.count / this.limit),
        page: this.page
      }

      return [recipes, pagination];
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = LoadService;