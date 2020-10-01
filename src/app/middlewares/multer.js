const multer = require('multer');

module.exports = (multer({

  // Como dever ser feito o armazenamento
  storage: multer.diskStorage({

    // Qual deve ser o destino
    destination: (req, file, cb) => {
      cb(null, './public/assets/uploads');
    },

    // Como deve se chamar
    filename: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  }),

  // Como os arquivos serão filtrados, quais formatos
  fileFilter: (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
      .find(acceptedFormat => acceptedFormat == file.mimetype);

    // se o formato for aceito
    if (isAccepted) {
      return cb(null, true);
    }

    return cb(null, false);
  }
}));