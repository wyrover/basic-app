'use strict'
const Koa = require('koa')
const serve = require('koa-static')
const router = require('./server/routes')
const view = require('./server/utils/view')

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(serve(__dirname + '/public'))
app.use(function *() {
	this.body = yield view(__dirname + '/public/index.html')
})

app.listen(3000)
console.log('Server running on port 3000')
