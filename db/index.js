const pgp = require('pg-promise')();

const cn = process.env.DATABASE_URL || {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
};

const db = pgp(process.env.DATABASE_URL || cn);

module.exports = db;
