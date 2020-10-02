module.exports = {
  dialect: 'postgres',
  host: 'ec2-54-156-121-142.compute-1.amazonaws.com',
  database: 'des647hpi31vq8',
  username: 'edongdognooiif',
  password: '15b86731cac72c7e10d441869437ed078841e05e8bad830ce24980cfbab9a99a',
  port: 5432,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};