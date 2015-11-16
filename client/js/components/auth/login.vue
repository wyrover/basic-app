<template>
	<main>
		<h2>Login page</h2>
		<form @submit.prevent="login">
			<input type="email" placeholder="Email" v-model="credentials.email" />
			<input type="password" placeholder="Password" v-model="credentials.password" />
			<button type="submit">Sign in</button>
		</form>
		<a v-link="{ name: 'auth.register' }">Create account</a>
	</main>
</template>

<script>
	export default {

		data() {
			return {
				credentials: {
					email: null,
					password: null,
				},
			}
		},

		methods: {
			login() {
				this.$http.post('/api/v1/auth/login', this.credentials, (response) => {
					if(response.user && response.token) {
						const user = JSON.stringify(response.user)
						const token = 'Bearer ' + response.token

						//localStorage.setItem('user', user)
						//localStorage.setItem('token', token)

						this.$dispatch('userHasLoggedIn', { user: user, token: token })
					} else {
						alert('Something went bad.')
					}
				}).error((err) => {
					alert(err.message)
				})
			},
		},

	}
</script>
