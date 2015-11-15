'use strict'
const r = require('../utils/rethinkdb')
const bcrypt = require('co-bcrypt')

const TABLE = 'users'

class User {

	constructor(args) {
		args = args || {}
		this.id = args.id
		this.username = args.username
		this.email = args.email
		this.password = args.password
	}

	*save() {
		const salt = yield bcrypt.genSalt(10)
		this.password = yield bcrypt.hash(this.password, salt)
		this.created_at = new Date().toISOString()
		// TODO: Ensure uniquess on update too.
		if(this.id) {
			const result = yield r.table(TABLE)
				.get(this.id)
				.update(this)
				.run()
			if(result && result.errors)
				throw new Error('Something went bad.')
			return result.replaced || 0
		} else {
			const result = yield r.branch(
					r.table(TABLE).filter(
						r.row('username').eq(this.username)
						.or(r.row('email').eq(this.email))
						).isEmpty(),
					r.table(TABLE).insert(this),
					{ error: { reason: 'User exists.' } }
				).run()
			if(result && result.errors)
				throw new Error('Something went bad.')
			else if(result && result.inserted === 1)
				this.id = result.generated_keys[0]
			else if(result.error.reason)
				throw new Error(result.error.reason)
		}
	}

	toJson() {
		const user = this
		delete user.password
		return user
	}

	*findById(id) {
		let user, result
		result = yield r.table(TABLE)
			.get(id)
			.run()
		if(result && result.length === 1) {
			user = new User(result[0])
		}
		return user
	}

	*findByUsername(username) {
		let user, result
		result = yield r.table(TABLE)
			.filter({ username: username })
			.run()
		if(result && result.length === 1) {
			user = new User(result[0])
		}
		return user
	}

	*findByEmail(email) {
		let user, result
		result = yield r.table(TABLE)
			.filter({ email: email })
			.run()
		if(result && result.length === 1) {
			user = new User(result[0])
		}
		return user
	}

	*comparePassword(passwd) {
		return yield bcrypt.compare(passwd, this.password)
	}

}

module.exports = User
