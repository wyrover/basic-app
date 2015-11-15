'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
	history: true,
	saveScrollPosition: true,
})

configRouter(router)

const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

window.router = router
