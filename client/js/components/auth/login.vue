<template>
	<main>
		<h2>Login page</h2>
		<form @submit.prevent="login">
			<input type="email" placeholder="Email" v-model="credentials.email">
			<input type="password" placeholder="Password" v-model="credentials.password">
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
				this.$http.post('auth/login', this.credentials, response => {
					if(response.user && response.token) {
						const user = response.user
						const token = 'Bearer ' + response.token

						this.$dispatch('userHasLoggedIn', { user, token })
					} else alert('Something went bad.')
				}).error(err => alert(err.message))
			},
		},

	}
</script>
