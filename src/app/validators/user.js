const User = require('../../models/User');

async function isExist(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.render('dashboard/parts/not_found');
    }

    req.user = user;
    next();
  } catch (err) {
    return res.render('dashboard/parts/not_found');
  }
}

async function post(req, res, next) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '' && key != 'id') {
      return res.render('dashboard/users/create', {
        user: req.body,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }

  const { email } = req.body;

  const findUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (findUser) {
    return res.render('dashboard/users/create', {
      user: req.body,

      error: 'Já existe um usuário cadastrado com esse email.'
    });
  }

  next();
}

async function profile(req, res, next) {
  const { userId } = req.session;
  const user = await User.findByPk(userId);

  if (!user) {
    return res.redirect('/login');
  }

  req.user = user;
  next();
}

async function putProfile(req, res, next) {
  const { id, email } = req.body;
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '' && key != 'id') {
      return res.render('dashboard/users/profile', {
        user: req.body,
        id: req.session.userId,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }
  const findUser = await User.findOne({
    where: {
      email: email
    }
  });
  if (findUser && id != findUser.id) {
    return res.render('dashboard/users/profile', {
      user: req.body,
      id: req.session.userId,
      error: 'Email já está cadastrado.'
    })
  }

  next();
}

async function put(req, res, next) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.render('dashboard/users/edit', {
        user: req.body,
        error: 'Por favor, preencha todos os campos.'
      });
    }
  }
  const { id, email } = req.body;
  const findUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (findUser && id != findUser.id) {
    return res.render('dashboard/users/edit', {
      user: req.body,
      error: 'Email já está cadastrado.'
    })
  }

  next();
}

module.exports = {
  post,
  isExist,
  profile,
  putProfile,
  put
}