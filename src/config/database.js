module.exports = {
  dialect: 'postgres',
  host: 'ec2-18-211-86-133.compute-1.amazonaws.com',
  username: 'fubaapjorqhcph',
  password: 'bdb52a8a0ad4f36712c10de4385bda4fb9eeda8f03af4b8a20445c24ee31c1c3',
  database: 'ddasqhqv0b8092',
  port: 5432,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};