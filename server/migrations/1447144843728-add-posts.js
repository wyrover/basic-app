'use strict'
const r = require('../utils/rethinkdb')

exports.up = function(next) {
	r.tableCreate('posts')
		.run(next)
}

exports.down = function(next) {
	r.tableDrop('posts')
		.run(next)
}
