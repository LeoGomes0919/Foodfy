module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST_NAME,
  database: process.env.DB_NAME_TABLE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
  },
};
