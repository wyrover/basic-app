'use strict'
const r = require('../utils/rethinkdb')
const config = require('../config')

exports.up = function(next) {
	r.dbCreate(config.rethink.db)
		.run(next)
}

exports.down = function(next) {
	r.dbDrop(config.rethink.db)
		.run(next)
}
