const env = require('dotenv').config().parsed;

module.exports = {
  "username": env.DB_USERNAME,
  "password": env.DB_PASSWORD,
  "database": env.DB_DATABASE,
  "host": env.DB_HOST,
  "port": env.DB_PORT,
  "dialect": env.DB_DIALECT
}