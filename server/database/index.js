const { Client } = require('pg');
const dotenv = require('dotenv').config();

module.exports = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

