'use strict'
const r = require('../utils/rethinkdb')

exports.up = function(next) {
	r.tableCreate('comments')
		.run(next)
}

exports.down = function(next) {
	r.tableDrop('comments')
		.run(next)
}
