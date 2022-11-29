const { Client } = require('pg');
const dotenv = require('dotenv').config();

function connectDB() {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });

  client.connect((err) => {
    if (err) throw err;
    console.log('Connected!')
  });
}

module.exports = {
  connectDB
};


