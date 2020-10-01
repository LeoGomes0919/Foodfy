const Chef = require('../../models/Chef');
const { Sequelize } = require('sequelize');

const LoadService = {
  load(service, filter) {
    this.filter = filter
    return this[service]()
  },

  async chefFindOne() {
    try {
      const chef = await Chef.findByPk(this.filter, {
        include: [
          { association: 'recipes', },
          { association: 'files', attributes: ['id', 'path', 'name'] },
        ],
      });

      return chef;
    } catch (err) {
      throw Error(err);
    }
  },

  async chefsAll() {
    try {
      const chefs = await Chef.findAll({
        include: {
          association: 'files', attributes: ['id', 'path', 'name']
        },
        order: [
          ['name', 'ASC'],
        ]
      });
      return chefs;
    } catch (err) {
      throw Error(err);
    }
  },

  async chefFindAllCount() {
    try {
      const chefs = await Chef.findAll({
        include: [
          { association: 'files', attributes: ['path'] },
          { association: 'recipes', attributes: [] },
        ],
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('recipes.chef_id')), 'total'],
          ],
        },
        group: [
          'Chef.id',
          'files.id',
        ]
      });
      
      return chefs;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = LoadService;