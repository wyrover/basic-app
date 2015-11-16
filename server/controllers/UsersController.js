'use strict'
const User = require('../models/User')

const UsersController = {

	index: function *() {
		//
	},

	show: function *() {
		const username = this.params.username
		if(username) {
			let user = new User()
			user = yield user.findByUsername(username)

			if(user) {
				this.body = user.toJson()
			}
		} else
			this.throw('Not Found.', 404)

	},

}

module.exports = UsersController
