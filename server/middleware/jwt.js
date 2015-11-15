'use strict'
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function() {
	return function *(next) {
		const authHeader = this.get('Authorization')
		if(authHeader) {
			const elements = authHeader.split(' ')
			if(elements.length === 2) {
				const scheme = elements[0]
				if(scheme === 'Bearer') {
					const token = elements[1]
					try {
						this.user = jwt.verify(token, config.jwt.secret)
					} catch(err) {
						// Nothing here
					}
				}
			}
		}
		yield next
	}
}
