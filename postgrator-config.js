/* eslint-disable strict */
require('dotenv').config();
const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL } = require('./src/config');

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
  'ssl': !!process.env.SSL
};