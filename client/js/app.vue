<template>
	<nav>
		<a v-link="{ name: 'home' }">Home</a>
		<template v-if="authenticated">
			<a v-link="{ name: 'profile', params: { username: user.username } }" v-text="user.username"></a>
			<a v-link="{ name: 'auth.logout' }">Exit</a>
		</template>
		<a v-else v-link="{ name: 'auth.login' }">Access</a>
	</nav>
	<router-view class="fade" transition="fade-" transition-mode="out-in" keep-alive></router-view>
</template>

<script>
	import localForage from 'localforage'
	localForage.setDriver(localForage.LOCALSTORAGE)
	export default {

		data() {
			return {
				user: null,
				token: null,
				authenticated: false
			}
		},

		ready() {
			this.tryLogin()
			this.$on('userHasLoggedIn', args => this.tryLogin(args))
			this.$on('userHasLoggedOut', () => this.destroyLogin())
		},

		methods: {
			tryLogin(args = {}) {
				if(args.user && args.token) {
					localForage.setItem('auth', args).then(val => {
						this.user = args.user
						this.token = args.token
						this.authenticated = true
						this.$route.router.go({ name: 'home' })
					}).catch(err => this.destroyLogin())
				} else {
					localForage.getItem('auth').then(val => {
						if(val && val.user && val.token) {
							this.user = val.user
							this.token = val.token
							this.authenticated = true
						} else this.destroyLogin()
					}).catch(err => this.destroyLogin())
				}
			},

			destroyLogin() {
				localForage.removeItem('auth').then(() => {
					this.user = null
					this.token = null
					this.authenticated = false
					this.$route.router.go({ name: 'home' })
				}).catch(err => console.error('Something went wrong. Try again.'))
			},
		},

	}
</script>
