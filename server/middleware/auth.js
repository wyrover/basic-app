'use strict'
module.exports = function *(next) {
	if(this.user && this.user.id)
		yield next
	else
		this.throw(401, 'Unauthorized.')
}
