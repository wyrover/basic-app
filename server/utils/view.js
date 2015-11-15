'use strict'
const fs = require('fs')

module.exports = function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
			if(err) return reject(err)
			resolve(data)
		})
	})
}
