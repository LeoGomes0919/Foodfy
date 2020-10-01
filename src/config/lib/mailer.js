const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3e571b6a5f8c01",
    pass: "cdf1b6b0cc7e55"
  }
});

module.exports = transport;