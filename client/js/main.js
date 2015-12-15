'use strict'
import localForage from 'localforage'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { configRouter } from './routes'

localForage.setDriver(localForage.LOCALSTORAGE)

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	history: true,
	saveScrollPosition: true,
})

configRouter(router)

Vue.http.options.root = '/api/v1'
localForage.getItem('auth').then(val => {
	if(val && val.user && val.token) {
		Vue.http.headers.common['Authorization'] = 'Bearer ' + val.token
	}
})

const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

window.router = router
