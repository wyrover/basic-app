'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { configRouter } from './routes'
import { jwt } from './interceptors/jwt'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	history: true,
	saveScrollPosition: true,
})

configRouter(router)

//Vue.http.interceptors.push(jwt)

const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

window.router = router
