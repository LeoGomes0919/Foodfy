const User = require('../../models/User');
const { compareSync } = require('bcryptjs');

async function login(req, res, next) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.render('login/index', {
        user: req.body,
        error: 'Por favor, informe seu email e senha.'
      });
    }
  }

  try {
    const { email, password } = req.body;
    
    const findUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (!findUser) {
      return res.render('login/index', {
        user: req.body,
        error: 'Usuário nao encontrado, verifique as informações.'
      });
    }

    const passed = compareSync(password, findUser.password);
    if (!passed) {
      return res.render('login/index', {
        user: req.body,
        error: 'Senha incorreta.'
      });
    }
    req.user = findUser;
    next();
  } catch (err) {
    return res.render('login/index', {
      user: req.body,
      error: 'Tivemos um problema com a sua solicitação;'
    });
  }
}

async function forgot(req, res, next) {
  const { email } = req.body;

  if (email == '') {
    return res.render('login/forget_password', {
      user: req.body,
      error: 'Por favor, informe seu email.'
    });
  }

  try {
    const findUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (!findUser) {
      return res.render('login/forget_password', {
        user: req.body,
        error: 'Usuário nao encontrado, verifique as informações.'
      });
    }

    req.user = findUser;
    next();
  } catch (err) {
    return res.render('login/forget_password', {
      user: req.body,
      error: 'Tivemos um problema com a sua solicitação.'
    });
  }
}

async function reset(req, res, next) {
  const keys = Object.keys(req.body);

  const { email, password, password_repeat, token } = req.body;

  for (key of keys) {
    if (req.body[key] == '' && key != 'token') {
      return res.render('login/reset_password', {
        user: req.body,
        token,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }

  try {
    const findUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (!findUser) {
      return res.render('login/reset_password', {
        user: req.body,
        token,
        error: 'Usuário nao encontrado, verifique as informações.'
      });
    }

    if (password != password_repeat) {
      return res.render('login/reset_password', {
        user: req.body,
        token,
        error: 'As senhas são diferentes.'
      });
    }

    if (token != findUser.reset_token) {
      return res.render('login/index', {
        user: req.body,
        token,
        error: 'Seu token está inválido, solicite um novo token.'
      });
    }

    let now = new Date();
    now = now.setHours(now.getHours());
    if (now > findUser.reset_token_expires) {
      return res.render('login/index', {
        user: req.body,
        token: req.query.token,
        error: 'Seu token está expirado, solicite um novo token.'
      });
    }

    req.user = findUser;

    next();
  } catch (err) {
    return res.render('login/reset_password', {
      user: req.body,
      token: req.query.token,
      error: 'Tivemos um problema com a sua solicitação.'
    });
  }
}

module.exports = {
  login,
  forgot,
  reset
}