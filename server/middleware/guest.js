'use strict'
module.exports = function *(next) {
	if(this.user && this.user.id)
		this.throw(403, 'Forbidden.')
	else
		yield next
}
