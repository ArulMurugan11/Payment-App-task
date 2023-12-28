const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USR_NAME,
  password: process.env.DB_PASS,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DATABASE_DIALECT,
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
};
// console.log(dbConfig)
module.exports = dbConfig;
