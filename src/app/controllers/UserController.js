const crypto = require('crypto');
const { hashSync } = require('bcryptjs');

const User = require('../../models/User');
const Recipe = require('../../models/Recipe');
const mailer = require('../../config/lib/mailer');

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      order: [
        ['name', 'ASC']
      ]
    });
    return res.render('dashboard/users/index', {
      users
    });
  },

  create(req, res) {
    return res.render('dashboard/users/create');
  },

  async edit(req, res) {
    return res.render('dashboard/users/edit', {
      user: req.user
    });
  },

  async profile(req, res) {
    return res.render('dashboard/users/profile', {
      user: req.user
    });
  },

  async profileRecipe(req, res) {
    try {
      const { userId } = req.session;
      const user = await User.findByPk(userId, {
        include: [
          { association: 'recipes', attributes: ['title'] },
        ]
      });
      const recipes = await Recipe.findAll({
        where: {
          user_id: userId
        },
        include: [
          { association: 'chefs', attributes: ['name'] },
          { association: 'files', through: 'recipe_files', attributes: ['path'] }
        ]
      });
      let total = await Recipe.count({
        where: {
          user_id: userId
        }
      });
      return res.render('dashboard/users/profile_recipe', {
        user,
        recipes,
        total
      });
    } catch (err) {
      return res.render('dashboard/users/profile_recipe', {
        error: 'Houve um erro ao tentar carregar suas receitas.'
      });
    }
  },

  async post(req, res) {
    const { name, email, isAdmin } = req.body;
    try {
      const passwordCrypto = crypto.randomBytes(4).toString('hex');
      const passwordHas = hashSync(passwordCrypto, 8);
      const user = await User.create({
        name,
        email,
        password: passwordHas,
        is_admin: isAdmin || false,
      });

      await mailer.sendMail({
        to: user.email,
        from: 'recipes@foodfy.com.br',
        subject: 'Dados da sua conta no Foodfy',
        html: `<h2>Ola ${user.name} <br /></h2>
        <h3>Abaixo estão seus dados de acesso <br /></h3>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Senha temporária:</b> ${passwordCrypto}</p>
        <p>Recomendamos que você altere sua senha no seu 1º acesso.</p>
        <p>
          <a 
            href="http://localhost:3000/login" 
            target="_blank"
          >
            CLIQUE PARA FAZER LOGIN
          </a>
        </p>

        <div>
          <span>Foodfy, todos os direitos reservados;</span>
        </div>
        `
      });
      const users = await User.findAll({
        order: [['name', 'ASC']]
      });
      return res.render('dashboard/users/index', {
        users,
        success: 'Email enviado ao usuário cadastrado.'
      });
    } catch (err) {
      return res.render('dashboard/users/create', {
        user: req.body,
        error: 'Houve um erro no cadastro.'
      });
    }
  },

  async putProfile(req, res) {
    const { id, name, email, password } = req.body;

    try {
      const newPassowrdHas = hashSync(password, 8);
      await User.update({
        name,
        email,
        password: newPassowrdHas
      }, {
        where: {
          id: id
        }
      });

      return res.render('dashboard/users/profile', {
        user: req.body,
        id: req.session.userId,
        success: 'Dados atualizados com sucesso.'
      })
    } catch (err) {
      return res.render('dashboard/users/profile', {
        user: req.body,
        id: req.session.userId,
        error: 'Houve um erro na atualização dos dados.'
      });
    }
  },

  async put(req, res) {
    const { id, name, email, isAdmin } = req.body;

    try {
      await User.update({
        name,
        email,
        is_admin: isAdmin || false
      }, {
        where: {
          id: id
        }
      });

      return res.redirect('/dashboard/users');
    } catch (err) {
      return res.render('dashboard/users/edit', {
        user: req.body,
        error: 'Houve um erro na atualização dos dados.'
      });
    }
  },

  async delete(req, res) {
    const { idUser } = req.body;
    try {
      await User.destroy({
        where: {
          id: idUser
        },
      });
      return res.redirect('/dashboard/users');
    } catch (err) {
      return res.render('dashboard/users/index', {
        error: 'Houve um erro na exclusão do usuário.'
      })
    }
  }
}