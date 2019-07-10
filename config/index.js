const dotenv = require('dotenv')

dotenv.config()

const database_name = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const db_port = process.env.DB_PORT

module.exports = {
	DB_URL: `mongodb://${user}:${password}@${host}:${db_port}/${database_name}`,
	DB_NAME: database_name
}