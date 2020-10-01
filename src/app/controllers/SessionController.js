const crypto = require('crypto');
const { hashSync } = require('bcryptjs');

const User = require('../../models/User');
const mailer = require('../../config/lib/mailer');

module.exports = {
  loginForm(req, res) {
    return res.render('login/index');
  },

  login(req, res) {
    req.session.userId = req.user.id;
    req.session.userName = req.user.name;
    req.session.isAdmin = req.user.is_admin;
    return res.redirect('/dashboard/users/profile');
  },

  logout(req, res) {
    req.session.destroy();
    return res.redirect('/login');
  },

  forgetPassword(req, res) {
    return res.render('login/forget_password');
  },

  resetPassword(req, res) {
    return res.render('login/reset_password', {
      token: req.query.token
    });
  },

  async forgot(req, res) {
    const user = req.user;
    const token = crypto.randomBytes(20).toString('hex');
    let now = new Date();
    now = now.setHours(now.getHours() + 1);

    try {
      await User.update({
        reset_token: token,
        reset_token_expires: now,
      }, {
        where: {
          id: user.id
        }
      });

      await mailer.sendMail({
        to: user.email,
        form: 'recipes@foodfy.com.br',
        subject: 'Recuperação de senha',
        html: `<h1>Olá ${user.name} <br /></h1>
          <h2>Clique no link abaixo para criar uma nova senha. <br /></h2>
          <p>
            <a
              href="http://localhost:3000/login/reset-password?token=${token}"
              target="_blank"
            >
              CLIQUE AQUI PARA CRIAR UMA NOVA SENHA
            </a>
          </p>
          <div>
              <span>Foodfy, todos os direitos reservados.</span>
            </div>
        `
      });
      return res.render('login/index', {
        success: 'Enviamos um email, verifique sua caixa de entrada.'
      });
    } catch (err) {
      return res.render('login/forget_password', {
        user: req.body,
        error: 'Houve um erro ao tentar recuperar sua senha.'
      });
    }
  },

  async reset(req, res) {
    const user = req.user;
    const {password, token} = req.body;
    console.log(password, token);
    try {
      const newPassword = hashSync(password, 8);
      await User.update({
        password: newPassword,
        reset_token: '',
        reset_token_expires: ''
      }, {
        where: {
          id: user.id
        }
      });
      return res.render('login/index', {
        user: req.body,
        success: 'Senha atualizada com sucesso.'
      });
    } catch (err) {
      console.error('ERROR AQUÍ' + err);
      return res.render('login/reset_password', {
        user: req.body,
        token,
        error: 'Houve um erro na tentativa de recuperação a senha.'
      });
    }
  }
}