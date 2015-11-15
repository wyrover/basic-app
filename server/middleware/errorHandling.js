'use strict'

module.exports = function() {
	return function *(next) {
		try {
			this.type = 'json'
			yield next
		} catch(err) {
			this.status = err.status || 500
			this.body = { message: err.message }
			this.type = 'json'
		}
	}
}
