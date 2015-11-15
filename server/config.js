'use strict'
require('dotenv').load()

module.exports = {
	secretKey: 'MySuperSecretKey',
	rethinkdb: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 28015,
		db: process.env.DB_DATABASE || 'test',
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'ARandomString',
	},
}
