const appName = 'App'
const appSuffix = ' | ' + appName
export function configRouter(router) {
	router.map({
		'/': {
			name: 'home',
			component: require('./components/home.vue'),
		},
		'/auth/register': {
			name: 'auth.register',
			title: 'Register',
			component: require('./components/auth/register.vue'),
		},
		'/auth/login': {
			name: 'auth.login',
			title: 'Login',
			component: require('./components/auth/login.vue'),
		},
		'*': {
			title: '404 Not Found',
			component: require('./components/errors/404.vue')
		}
	})

	router.beforeEach((transition) => {
		let title = transition.to.title
		if(title)
			document.title = title + appSuffix
		else
			document.title = appName
		transition.next()
	})
}
