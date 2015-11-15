'use strict'
const RethinkDB = require('rethinkdbdash')
const config = require('../config')

let r

if(!r) r = new RethinkDB(config.rethinkdb)

module.exports = r
