'use strict'
const Router = require('koa-router')
const koaBody = require('koa-body')
const jwt = require('./middleware/jwt')
const errorHandling = require('./middleware/errorHandling')
const auth = require('./middleware/auth')
const guest = require('./middleware/guest')
const controllers = require('./controllers/index')

const router = new Router({ prefix: '/api/v1' })

router.use(koaBody())
router.use(jwt())
router.use(errorHandling())

router.get('/', function *() {
	this.body = { message: 'Hello from the API.' }
})
router.post('/auth/register', guest, controllers.auth.register)
router.post('/auth/login', guest, controllers.auth.login)
router.get('/auth/logout', auth, controllers.auth.logout)
router.post('/me', auth, function *() {
	const data = this.user
	this.body = data
})
router.all('*', function *() {
	this.throw('Not Found.', 404)
})

module.exports = router
