<template>
	<main>
		<h2>Registration page</h2>
		<form @submit.prevent="register">
			<input type="text" placeholder="Username" v-model="user.username">
			<input type="email" placeholder="Email" v-model="user.email">
			<input type="password" placeholder="Password" v-model="user.password">
			<button type="submit">Sign up</button>
		</form>
	</main>
</template>

<script>
	export default {

		data() {
			return {
				user: {
					username: null,
					email: null,
					password: null,
				},
			}
		},

		methods: {
			register() {
				this.$http.post('auth/register', this.user, response => {
					if(response.user && response.message) {
						alert(response.message)
						this.$route.router.go({ name: 'auth.login' })
					} else alert('Something went bad.')
				}).error(err => alert(err.message))
			},
		},

	}
</script>
