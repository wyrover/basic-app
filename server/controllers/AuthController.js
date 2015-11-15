'use strict'
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

const AuthController = {

	register: function *() {
		const input = this.request.body

		const username = input.username,
			email = input.email,
			password = input.password

		if(username && email && password) {
			const user = new User({ username: username, email: email, password: password })
			try {
				yield user.save()
			} catch(err) {
				this.throw('Username or email already taken.', 422)
			}
			this.status = 201
			this.body = { message: 'Account created', user: user.toJson() }
		} else
			this.throw('Unprocessable Entity.', 422)
	},

	login: function *() {
		const input = this.request.body

		const email = input.email
		const password = input.password

		if(email && password) {
			let user = new User()
			user = yield user.findByEmail(email)

			if(user) {
				const match = yield user.comparePassword(password)
				if(match) {
					const token = jwt.sign(user.toJson(), config.jwt.secret)
					this.body = { token: token }
				}
				else
					this.throw('Bad credentials.', 422)
			} else
				this.throw('User not found.', 404)
		} else
			this.throw('Unprocessable Entity.', 422)
	},

	logout: function *() {

	}

}

module.exports = AuthController
