const { Pool } = require('pg')
const databaseConfig = require('./secrets/databaseConfig')

const pool = new Pool(databaseConfig)

module.exports = pool
