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
			this.$on('userHasLoggedIn', (args) => this.tryLogin(args))
			this.$on('userHasLoggedOut', () => this.destroyLogin())
		},

		methods: {
			tryLogin(args) {
				args = args || {}
				if(args.user && args.token) {
					localStorage.setItem('user', args.user)
					localStorage.setItem('token', args.token)
					this.user = JSON.parse(args.user)
					this.token = args.token
					this.authenticated = true
					this.$route.router.go({ name: 'home' })
				} else {
					const user = localStorage.getItem('user')
					const token = localStorage.getItem('token')
					if(user && token) {
						this.user = JSON.parse(user)
						this.token = token
						this.authenticated = true
					} else
						this.destroyLogin()
				}
			},

			destroyLogin() {
				localStorage.removeItem('user')
				localStorage.removeItem('token')
				this.user = null
				this.token = null
				this.authenticated = false
				this.$route.router.go({ name: 'home' })
			}
		},
	}
</script>
