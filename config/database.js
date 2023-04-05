require("dotenv").config()

// const {
//    DB_USERNAME = "postgres",
//    DB_PASSWORD = "dwbXFY1d0Y0N4FZUqUDr",
//    DB_HOST = "containers-us-west-99.railway.app127.0.0.1",
//    DB_NAME = "rental",
//    DB_PORT = "7872",
// } = process.env;

module.exports = {
   development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
   },
   test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
   },
   production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
   },
};
