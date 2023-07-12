require('dotenv').config();

const config = {
  user: encodeURIComponent(process.env.PG_COMMON_USERNAME),
  password: encodeURIComponent(process.env.PG_COMMON_PASSWORD),
  database: encodeURIComponent(process.env.PG_COMMON_DATABASE),
  host: encodeURIComponent(process.env.PG_COMMON_HOST),
  port: encodeURIComponent(process.env.PG_COMMON_PORT),
}

module.exports = { config };
