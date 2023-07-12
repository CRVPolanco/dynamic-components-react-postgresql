const { Pool } = require('pg');
const { config } = require('./config');

const connection = new Pool(config);

module.exports = { connection };
