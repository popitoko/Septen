require('dotenv').config()

module.exports = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamp: true,
    underscored: true
  }
}