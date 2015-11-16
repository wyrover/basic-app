'use strict'
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
			guest: true,
			component: require('./components/auth/register.vue'),
		},
		'/auth/login': {
			name: 'auth.login',
			title: 'Login',
			guest: true,
			component: require('./components/auth/login.vue'),
		},
		'/auth/logout': {
			name: 'auth.logout',
			component: require('./components/auth/logout'),
		},
		'/users/:username': {
			name: 'profile',
			title: 'Profile',
			component: require('./components/profile/index.vue'),
			subRoutes: {
				'posts': {
					name: 'profile.posts',
					component: require('./components/profile/posts.vue'),
				},
			},
		},
		'*': {
			title: '404 Not Found',
			component: require('./components/errors/404.vue'),
		},
	})

	router.redirect({
		'/users/:username': '/users/:username/posts',
	})

	router.beforeEach((transition) => {
		if(transition.to.title)
			document.title = transition.to.title + appSuffix
		else
			document.title = appName

		const token = localStorage.getItem('token')
		if(transition.to.auth && (!token || token === null))
			transition.redirect({ name: 'auth.login' })
		if(transition.to.guest && token)
			transition.redirect({ name: 'home' })

		transition.next()
	})
}
